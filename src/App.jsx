import { useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser,  } from "./reducers/userReducer";
import { DisplayBlogs } from "./components/DisplayBlogs";

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(()=>{
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch]);

  // console.log("blogs: ", blogs);

  if (user === null) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

  return <DisplayBlogs />
  
}

export default App;
