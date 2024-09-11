import { useState, useEffect } from 'react'

import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') // alexander
  const [password, setPassword] = useState('') // stack
  const [user, setUser] = useState(null)
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleCreate = async (event) => {
    event.preventDefault()
    
    await blogService.create(
      {
        author: author,
        title: title,
        url: url
      }
    )

    setTitle('')
    setAuthor('')
    setUrl('')

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

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={ ({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={ ({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={ ({target}) => setUrl(target.value)}
          />
        </div>
        <button type="submit">
          create
        </button>
      </form>
    </div>
  )

  const blogDisplay = () => (
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  )

  return (
    <div>
      <h2>blogs</h2>
      {user === null && loginForm()}
      {user !== null && userInformation()}
      {user !== null && blogForm()}
      {user !== null && blogDisplay()}
    </div>
  )
}

export default App