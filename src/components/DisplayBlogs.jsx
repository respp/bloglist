import React from 'react'
import { useRef } from 'react';
import { NewBlogForm } from './NewBlogForm';
import Togglable from "./Togglable";
import { Notification } from "./Notification";
import Blog from "./Blog";
import { useSelector } from 'react-redux';
import { Error } from './ErrorMessage';

export const DisplayBlogs = () => {
    const blogs = useSelector(state => state.blogs)
    const blogFormRef = useRef();


  return (
    <div data-testid="logged">
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
