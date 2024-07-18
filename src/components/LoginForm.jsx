import React from "react";
// import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";
import { error } from "../reducers/errorMessageReducer";
import { Error } from "./ErrorMessage";

export const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("loggin in with ", username, password);
    try {
        await dispatch(login({username, password}))
        setUsername("");
        setPassword("");
    } catch (err) {
      console.error('el error es: ',err)
      dispatch(error('wrong username or password', 5))
    }
  }
  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} data-testid="form">
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            data-testid="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            data-testid="password"
          />
        </div>
        <button type="submit">login</button>
      </form>
      <Error />
    </>
  );
};

// LoginForm.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
//   handleUsernameChange: PropTypes.func.isRequired,
//   handlePasswordChange: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
// };
