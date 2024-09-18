import { forwardRef, useImperativeHandle, useState } from 'react'
import Togglable from './Togglable'

const Blog = forwardRef((props, refs) => {
  const [likes, setLikes] = useState(props.blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const like = () => {
    //console.log(props.blog)
    setLikes(props.blog.likes + 1)
  }

  useImperativeHandle(refs, () => {
    return {
      like
    }
  })

  const loggedUser = props.user.username
  const blogCreator = props.blog.user ? props.blog.user.username : ''

  return (
    <div style={blogStyle}>
      <div>
        {props.blog.title} {props.blog.author}
      </div>
      <div>
        <Togglable buttonLabel='view'>
          <div>
            {props.blog.url}
            <br/>
            {props.blog.likes} <button onClick={() => props.handleLike(props.blog)}>like</button>
            <br/>
            {props.blog.user ? props.blog.user.name : 'no name'}
          </div>
          <div>
            {
              loggedUser === blogCreator &&
              <button onClick={() => props.handleRemove(props.blog)}>remove</button>
            }
          </div>
        </Togglable>
      </div>
    </div>
  )
})

Blog.displayName = 'Blog'

export default Blog