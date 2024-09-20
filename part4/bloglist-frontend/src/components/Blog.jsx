import { forwardRef, useImperativeHandle, useState } from 'react'

import Togglable from './Togglable'
import BlogSmall from './BlogSmall'
import BlogExpanded from './BlogExpanded'

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
    setLikes(likes + 1)
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
      <BlogSmall title={props.blog.title} author={props.blog.author} />
      <Togglable buttonLabel='view' className='toggleable'>
        <BlogExpanded
          blog={props.blog}
          loggedUser={loggedUser}
          blogCreator={blogCreator}
          handleLike={props.handleLike}
          handleRemove={props.handleRemove}
        />
      </Togglable>
    </div>
  )
})

Blog.displayName = 'Blog'

export default Blog