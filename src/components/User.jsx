import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'

export const User = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const handleLogout = () => {
        dispatch(logout())
      };
  
    return (
    <div>
    <h1>blogs</h1>
      <p>
        {user.username} logged in<button onClick={handleLogout}>logout</button>
      </p>
    </div>
  )
}
