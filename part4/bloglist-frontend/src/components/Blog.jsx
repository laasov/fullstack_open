import Togglable from "./Togglable"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const username = blog.user ? blog.user.name : 'no name'

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <nobr/>
      <div>
        <Togglable buttonLabel='view'>
          <div>
            {blog.url}
            <br/>
            {blog.likes} <button>like</button>
            <br/>
            {username}
          </div>
        </Togglable>
      </div>
  </div>
  )
}

export default Blog