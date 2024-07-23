import { useDispatch, useSelector } from "react-redux";
import { likeABlog, deleteBlog } from "../reducers/blogReducer";
import { useParams } from "react-router-dom";
import Togglable from "./Togglable";
import { CommentForm } from "./CommentForm";
import { Button } from 'react-bootstrap';

const Blog = () => {
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find(blog => blog.id === id)
  )
  const dispatch = useDispatch()
  // const commentRef = useRef()

  console.log(blog)
  if (!blog) return <div>Blog not found</div>

  const like = blog => dispatch(likeABlog(blog, blog.id))

  const removeBlog = blog => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`);
    if (confirm) {
      dispatch(deleteBlog(blog.id))
    }
  }  

  console.log(blog.comments)
  return (
    <div>
      <h1>&quot;{blog.title}&quot; by {blog.author}</h1>
          Url: <a href={blog.url}className="custom-link">{blog.url}</a> <br />
          Likes: {blog.likes}
          <Button variant="outline-light" onClick={()=>like(blog)}>Like</Button>{' '}<br />
          <Button variant="outline-danger" onClick={()=>removeBlog(blog)}>
            remove
          </Button>{' '}
          <p>added by {blog.user.name}</p>

          <h3>Comments</h3>

          <ul>
            {blog.comments.map((comment, i)=>
              <li key={i}>{comment}</li>
          )}
          </ul>
          <Togglable
          firstButtonLabel="Comment on blog"
          secondButtonLabel="Cancel"
          // ref={commentRef}
        >
          <CommentForm id={blog.id}/>
        </Togglable>
    </div>
  );
};

export default Blog;
