import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DisplayBlogs } from "../components/DisplayBlogs";
import { DisplayUsers } from "../components/DisplayUsers";
import { LoginForm } from "../components/LoginForm";
import { useSelector } from "react-redux";
import { UserBlogs } from "../components/UserBlogs";
import { User } from '../components/User'

const AppRoutes = () => {
  const user = useSelector(state => state.user)

  if (user === null) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

  return (
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
      <Route path="*" element={<Navigate to="/" />} /> {/* Redirigir rutas desconocidas a la página principal */}
    </Routes>
  );
};

export default AppRoutes;
