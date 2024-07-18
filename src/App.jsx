import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import { Error } from "./components/ErrorMessage";
import { NewBlogForm } from "./components/NewBlogForm";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import { Notification } from "./components/Notification";
import { LoginForm } from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, login } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(()=>{
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, []);

  // console.log("blogs: ", blogs);

  const blogFormRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("loggin in with ", username, password);
    try {
      // const user = await loginService.login({
      //   username,
      //   password,
      // });
      dispatch(login({username, password}))

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

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
    localStorage.removeItem("loggedBlogappUser");
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
        <NewBlogForm />
      </Togglable>
      <Error message={errorMessage} />
      <div data-testid="blogs">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
