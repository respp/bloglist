import React from 'react'
import { useRef } from 'react';
import { NewBlogForm } from './NewBlogForm';
import Togglable from "./Togglable";
import { Notification } from "./Notification";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Error } from './ErrorMessage';

export const DisplayBlogs = () => {
    const blogs = useSelector(state => state.blogs)
    const blogFormRef = useRef();


  return (
    <div data-testid="logged">
    <h1>Blogs</h1>
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
          <div key={blog.id} className='blog'><Link to={`/blogs/${blog.id}`}>"{blog.title}" by {blog.author}</Link></div>
        ))}
      </div>
    </div>
  )
}
