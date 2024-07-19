import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const UserBlogs = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );

  if (!user) {
    return <div>User not found</div>;
  }

  if(user.blogs.length === 0) return (
    <>
    <h2>{user.name}</h2>
    <h3>This user has no blogs</h3>
    </>
  )

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}
