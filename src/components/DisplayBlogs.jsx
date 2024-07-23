import React from 'react'
import { useRef } from 'react';
import { NewBlogForm } from './NewBlogForm';
import Togglable from "./Togglable";
import { Notification } from "./Notification";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Error } from './ErrorMessage';
import { Card } from 'react-bootstrap';

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
            <Card key={blog.id}>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                <Link to={`/blogs/${blog.id}`}>
                  <p>
                    {' '}{blog.title}{' '}
                  </p>
                </Link>
                  <footer className="blockquote-footer">
                    By <cite title="Source Title">{blog.author}</cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
        ))}
      </div>
    </div>
  )
}
