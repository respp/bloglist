import React from 'react'
import { useRef } from 'react';
import { NewBlogForm } from './NewBlogForm';
import Togglable from "./Togglable";
import { Notification } from "./Notification";
import { logout } from '../reducers/userReducer';
import Blog from "./Blog";
import { useDispatch, useSelector } from 'react-redux';
import { Error } from './ErrorMessage';

export const DisplayBlogs = () => {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const blogFormRef = useRef();

    const handleLogout = () => {
      dispatch(logout())
    };


  return (
    <div data-testid="logged">
      <h1>blogs</h1>
      <p>
        {user.username} logged in<button onClick={handleLogout}>logout</button>
      </p>

      <Notification  />
      <Togglable
        firstButtonLabel="Create Blog"
        secondButtonLabel="cancel"
        ref={blogFormRef}
      >
        <NewBlogForm />
      </Togglable>
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
  )
}
