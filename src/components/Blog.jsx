import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const updateLikes = () => {
    const blogId = blog.id;
    updateBlog(
      {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      },
      blogId,
    );
  };

  const removeBlog = () => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`);
    if (confirm) {
      return deleteBlog(blog.id);
    }
  };

  return (
    <div className="blog">
      &quot;{blog.title}&quot; by {blog.author}
      <button onClick={toggleVisibility}>{visible ? "Hide" : "Details"}</button>
      {visible ? (
        <div className="blog-details">
          Url: {blog.url} <br />
          Likes: {blog.likes}
          <button onClick={updateLikes}>Like</button> <br />
          <button onClick={removeBlog} className="removeBtn">
            remove
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
