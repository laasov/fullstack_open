import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') // alexander
  const [password, setPassword] = useState('') // stack
  const [user, setUser] = useState(null)

  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const [addedMessage, setAddedMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password, })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const handleLogout = async (event) => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const handleCreate = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setAddedMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added!`)
        setTimeout(() => {setAddedMessage(null)}, 5000)
      })
  }

  const handleLike = async (blog) => {

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user ? blog.user : 'unnamed user',
      id: blog.id
    }

    const response = await blogService.update(blog.id, updatedBlog)
    blogRef.current.like()
    setBlogs(blogs.map(elem => elem.id === response.id ? updatedBlog : elem))
  }

  const handleRemove = (blog) => {

    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      const removedId = blog.id
      blogService
        .remove(blog.id)
        .then(setBlogs(blogs.filter(elem => elem.id != removedId)))
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={ ({target}) => setUsername(target.value) }
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={ ({target}) => setPassword(target.value) }
            />
          </div>
          <button type="submit">login</button>
        </form>
  )

  const userInformation = () => (
    <div>
      {user.name} logged in
      <button type="submit" onClick={handleLogout}>
        logout
      </button>
    </div>
  )


  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display : blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>new note</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm handleCreate={handleCreate}/>
        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
      </div>
    )
  }

  const blogDisplay = () => (
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog =>  <Blog key={blog.id}
                          blog={blog}
                          likes={likes}
                          ref={blogRef}
                          handleLike={handleLike}
                          handleRemove={handleRemove}
                          user={user}
                    />)
  )

  const displayMessage = () => (
    <div>
      {addedMessage}
    </div>
  )

  const displayError = () => (
    <div>
      {errorMessage}
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      {displayMessage()}
      {displayError()}
      {user === null && loginForm()}
      {user !== null && userInformation()}
      {user !== null && blogForm()}
      {user !== null && blogDisplay()}
    </div>
  )
}

export default App