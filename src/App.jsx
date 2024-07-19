import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser,  } from "./reducers/userReducer";
import { initializeAllUsers } from "./reducers/allUsersReducer";

import AppRoutes from "./router/routes";

const App = () => {
  const dispatch = useDispatch()

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

  return <AppRoutes />
  
}

export default App;
