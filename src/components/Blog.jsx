import { useDispatch, useSelector } from "react-redux";
import { likeABlog, deleteBlog } from "../reducers/blogReducer";
import { useParams } from "react-router-dom";
import Togglable from "./Togglable";
import { CommentForm } from "./CommentForm";
import { useRef } from "react";
const Blog = () => {
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find(blog => blog.id === id)
  )
  const dispatch = useDispatch()
  const commentRef = useRef()

  console.log(blog)
  if (!blog) return <div>Blog not found</div>

  const like = blog => dispatch(likeABlog(blog, blog.id))

  const removeBlog = blog => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`);
    if (confirm) {
      dispatch(deleteBlog(blog.id))
    }
  }  

  return (
    <div>
      <h1>&quot;{blog.title}&quot; by {blog.author}</h1>
          <a href='https://google.com'>{blog.url}</a> <br />
          Likes: {blog.likes}
          <button onClick={()=>like(blog)}>Like</button> <br />
          <button onClick={()=>removeBlog(blog)} className="removeBtn">
            remove
          </button>
          <p>added by {blog.user.name}</p>
          <Togglable
          firstButtonLabel="Comment on blog"
          secondButtonLabel="Cancel"
          // ref={commentRef}
        >
          <CommentForm />
        </Togglable>
    </div>
  );
};

export default Blog;
