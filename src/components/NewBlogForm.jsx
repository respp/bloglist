import { useDispatch } from "react-redux";
import { newBlog } from "../reducers/blogReducer";
import { notification } from "../reducers/notificationReducer";

export const NewBlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = e =>{
    e.preventDefault()
    const input = e.target
    const content = {
      title : input.title.value,
      author : input.author.value,
      url : input.url.value,
      likes : 0,
    }
    dispatch(newBlog(content))
    dispatch(notification(`the blog "${content.title}" by ${content.author} was added`, 5))
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div className="new-blog">
          <label htmlFor="title">title: </label>
          <input
            id="title"
            name="title"
            required
          />
          <br />
          <label htmlFor="author">author: </label>
          <input
            id="author"
            name="author"
            required
          />
          <br />
          <label htmlFor="url">url: </label>
          <input
            id="url"
            name="url"
            required
          />
          <br />
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};
