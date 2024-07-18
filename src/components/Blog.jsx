import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeABlog, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => { //blog, updateBlog, deleteBlog
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  const like = blog => dispatch(likeABlog(blog, blog.id))

  const removeBlog = blog => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`);
    if (confirm) {
      dispatch(deleteBlog(blog.id))
    }
  }

  

  return (
    <div className="blog">
      &quot;{blog.title}&quot; by {blog.author}
      <button onClick={toggleVisibility}>{visible ? "Hide" : "Details"}</button>
      {visible ? (
        <div className="blog-details">
          Url: {blog.url} <br />
          Likes: {blog.likes}
          <button onClick={()=>like(blog)}>Like</button> <br />
          <button onClick={()=>removeBlog(blog)} className="removeBtn">
            remove
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
