import { useState } from "react";
import { useDispatch } from "react-redux";
import { newBlog } from "../reducers/blogReducer";

export const NewBlogForm = () => { //{ createNewBlog }
  const dispatch = useDispatch()

  // const [newBlogName, setNewBlogName] = useState("");
  // const [newBlogAuthor, setNewBlogAuthor] = useState("");
  // const [newBlogUrl, setNewBlogUrl] = useState("");

  // const addBlog = (e) => {
  //   e.preventDefault();
  //   createNewBlog({
  //     title: newBlogName,
  //     author: newBlogAuthor,
  //     url: newBlogUrl,
  //     likes: 0,
  //   });
  //   setNewBlogName("");
  //   setNewBlogAuthor("");
  //   setNewBlogUrl("");
  // };

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
            // value={newBlogName}
            // onChange={({ target }) => setNewBlogName(target.value)}
            required
          />{" "}
          <br />
          <label htmlFor="author">author: </label>
          <input
            id="author"
            name="author"
            // value={newBlogAuthor}
            // onChange={({ target }) => setNewBlogAuthor(target.value)}
            required
          />{" "}
          <br />
          <label htmlFor="url">url: </label>
          <input
            id="url"
            name="url"
            // value={newBlogUrl}
            // onChange={({ target }) => setNewBlogUrl(target.value)}
            required
          />{" "}
          <br />
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};
