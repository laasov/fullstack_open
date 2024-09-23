const BlogData = (props) => {
  return (
    <div>
      <div>
        {props.blog.url}
      </div>
      <br/>
      <div>
        {props.blog.likes} <button onClick={() => props.handleLike(props.blog)}>like</button>
      </div>
      <br/>
      <div>
        {props.blog.user ? props.blog.user.name : 'no name'}
        {
          props.loggedUser === props.blogCreator &&
            <button onClick={() => props.handleRemove(props.blog)}>remove</button>
        }
      </div>
    </div>
  )
}

export default BlogData