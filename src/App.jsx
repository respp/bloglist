import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import { Error } from "./components/ErrorMessage";
import { NewBlogForm } from "./components/NewBlogForm";
import Togglable from "./components/Togglable";
import { Notification } from "./components/Notification";
import { LoginForm } from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, login, logout } from "./reducers/userReducer";
import { notification } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [errorMessage, setErrorMessage] = useState(null);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(()=>{
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch]);

  // console.log("blogs: ", blogs);

  const blogFormRef = useRef();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   console.log("loggin in with ", username, password);
  //   try {
  //       dispatch(login({username, password}))
  //       setUsername("");
  //       setPassword("");
  //   } catch (err) {
  //       dispatch(notification('wrong username or password', 5))
  //   }
  // };

  const handleLogout = () => {
    dispatch(logout())
  };

  if (user === null) {
    //formulario de login
    return (
      <div>
        <LoginForm
          // handleLogin={handleLogin}
          // username={username}
          // handleUsernameChange={({ target }) => setUsername(target.value)}
          // password={password}
          // handlePasswordChange={({ target }) => setPassword(target.value)}
        />
         {/* message={errorMessage} */}
        <Error />
      </div>
    );
  }

  return (
    <div data-testid="logged">
      <h1>blogs</h1>
      <p>
        {user.username} logged in<button onClick={handleLogout}>logout</button>
      </p>

      {/* message={notificationMessage} */}
      <Notification  />
      <Togglable
        firstButtonLabel="Create Blog"
        secondButtonLabel="cancel"
        ref={blogFormRef}
      >
        <NewBlogForm />
      </Togglable>
      {/* message={errorMessage} */}
      <Error />
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
