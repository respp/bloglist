import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

export const DisplayUsers = () => {

  
  const users = useSelector(state => state.users)

  return (
    <>
      <h1>Users</h1>
      <table className='table'>
          <tbody><tr>
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
               <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td><h4>{user.blogs.length}</h4></td>
            </tr>
          ))}
          </tbody>
      </table>
    </>
  )
}
