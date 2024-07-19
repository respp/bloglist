import { Routes, Route, Navigate } from "react-router-dom";
import { DisplayBlogs } from "../components/DisplayBlogs";
import { DisplayUsers } from "../components/DisplayUsers";
import { LoginForm } from "../components/LoginForm";
import { useSelector } from "react-redux";
import { UserBlogs } from "../components/UserBlogs";
import { User } from '../components/User'
import Blog from "../components/Blog";


const AppRoutes = () => {
  const user = useSelector(state => state.user)

  if (user === null) return <LoginForm />

  return (
    <>
    <Routes>
      <Route path="/" element={
        <>
          <User />
          <DisplayBlogs />
        </>
        } />
      <Route path="/users" element={
        <>
            <User />
            <DisplayUsers />
        </>
        } />
      <Route path="/users/:id" element={
        <>
          <User />
          <UserBlogs />
        </>
        } />
        <Route path="/blogs/:id" element={
        <>
          <User />
          <Blog />
        </>
        } />
      <Route path="*" element={<Navigate to="/" />} /> {/* Redirigir rutas desconocidas a la página principal */}
    </Routes>
    </>
  );
};

export default AppRoutes;
