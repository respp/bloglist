import { useRef } from "react"
import Togglable from "./Togglable"

const Blog = ({ blog }) => {
    const blogButtonRef = useRef()

    return(
    <div className="blog">
      "{blog.title}" by {blog.author} 
      <Togglable firstButtonLabel='Details' secondButtonLabel='Hide' ref={blogButtonRef}>
        Url: {blog.url} <br />
        Likes: {blog.likes}
      </Togglable>
    </div>  
)}

export default Blog