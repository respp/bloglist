import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import { Error } from "./components/ErrorMessage";
import { NewBlogForm } from "./components/NewBlogForm";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import { Notification } from "./components/Notification";
import { LoginForm } from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => {
        setBlogs(blogs.sort((b1, b2) => b2.likes - b1.likes));
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  console.log("blogs: ", blogs);

  const blogFormRef = useRef();

  const createNewBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(blogObject);
      setBlogs((prevBlogs) => prevBlogs.concat(returnedBlog));
      setNotificationMessage(
        `a new blog "${blogObject.title}" by ${blogObject.author}`,
      );
      setTimeout(() => {
        setNotificationMessage(null);
      }, 3000);
    } catch (err) {
      setErrorMessage(`${err}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const updateBlog = (blogObject, blogId) => {
    blogService.update(blogId, blogObject).then((returnedBlog) => {
      console.log(returnedBlog);
      setBlogs(
        blogs.map((blog) =>
          blog.id !== returnedBlog.id ? blog : returnedBlog,
        ),
      );
    });
  };

  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId);
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (err) {
      setErrorMessage("Error deleting blog", err);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("loggin in with ", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong Username or Password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    console.log("sesión cerrada");
    localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  if (user === null) {
    //formulario de login
    return (
      <div>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          password={password}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
        <Error message={errorMessage} />
      </div>
    );
  }

  return (
    <div data-testid="logged">
      <h1>blogs</h1>
      <p>
        {user.username} logged in<button onClick={handleLogout}>logout</button>
      </p>

      <Notification message={notificationMessage} />
      <Togglable
        firstButtonLabel="Create Blog"
        secondButtonLabel="cancel"
        ref={blogFormRef}
      >
        <NewBlogForm createNewBlog={createNewBlog} />
      </Togglable>
      <Error message={errorMessage} />
      <div data-testid="blogs">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
