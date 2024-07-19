import { useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser,  } from "./reducers/userReducer";
import { DisplayBlogs } from "./components/DisplayBlogs";
import { DisplayUsers } from "./components/DisplayUsers";
import { initializeAllUsers } from "./reducers/allUsersReducer";

import AppRoutes from "./router/routes";

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(()=>{
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch]);  

  useEffect(()=>{
    dispatch(initializeAllUsers())
  }, [dispatch])

  // console.log("blogs: ", blogs);

  if (user === null) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

  return <AppRoutes />
  
}

export default App;
