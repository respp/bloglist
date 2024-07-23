import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";
import { error } from "../reducers/errorMessageReducer";
import { Error } from "./ErrorMessage";
import { Form, Button } from 'react-bootstrap';


export const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

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
      <Form onSubmit={handleLogin} data-testid="form">
        <div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} placeholder="Enter email" name="Username"
            onChange={({ target }) => setUsername(target.value)}
            data-testid="username" />
      </Form.Group>
        </div>
        <div>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} placeholder="Password" name="Password" onChange={({ target }) => setPassword(target.value)}
            data-testid="password"/>
      </Form.Group>
        </div>
        <Button variant='outline-success' type="submit">login</Button>{''}
      </Form>
      <Error />
    </>
  );
}
