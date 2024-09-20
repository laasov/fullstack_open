const BlogData = (props) => {
  return (
    <div>
      {props.blog.url}
      <br/>
      {props.blog.likes} <button onClick={() => props.handleLike(props.blog)}>like</button>
      <br/>
      {props.blog.user ? props.blog.user.name : 'no name'}
      {
        props.loggedUser === props.blogCreator &&
          <button onClick={() => props.handleRemove(props.blog)}>remove</button>
      }
    </div>
  )
}

export default BlogData