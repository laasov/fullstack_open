import Togglable from "./Togglable"

import blogService from "../services/blogs"
import { useState } from "react"

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [likes, setLikes] = useState(blog.likes)

  const handleLike = () => {

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user ? blog.user.name : 'unnamed user'
    }

    blogService
      .update(blog.id, updatedBlog)
      .then(setLikes(updatedBlog.likes))
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        <Togglable buttonLabel='view'>
          <div>
            {blog.url}
            <br/>
            {likes} <button onClick={handleLike}>like</button>
            <br/>
            {blog.user ? blog.user.name : 'no name'}
          </div>
        </Togglable>
      </div>
  </div>
  )
}

export default Blog