import { useRef } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogButtonRef = useRef()

  const updateLikes =() => {
    const blogId = blog.id
    updateBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    },
    blogId
    )
  }

  const removeBlog =() => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    if (confirm){
      return deleteBlog(blog.id)
    }
  }


  return(
    <div className="blog">
      "{blog.title}"
      <Togglable firstButtonLabel='Details' secondButtonLabel='Hide' ref={blogButtonRef}>
        <div>
            Url: {blog.url} <br />
            Likes: {blog.likes}
          <button onClick={updateLikes}>Like</button> <br />
          {blog.author} <br />
          <button onClick={removeBlog} className="removeBtn">remove</button>
        </div>
      </Togglable>
    </div>
  )}

export default Blog