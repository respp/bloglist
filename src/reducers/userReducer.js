import { createSlice } from "@reduxjs/toolkit"
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
    name : 'user',
    initialState : null,
    reducers : {
        setUser(state, action){
            return action.payload
        }
    }
})

//***************** REDUX THUNK ******************/

export const initializeUser = ()=>{
    return dispatch =>{
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        blogService.setToken(user.token)
        dispatch({ type: "user/setUser", payload: user })
        }
    }
}

export const login = credentials =>{ //username, password
    return async dispatch => {
        const user = await loginService.login(credentials)
        // console.log(user)
        window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
        blogService.setToken(user.token)
        dispatch(setUser(user))
        return user
    }
}

export const logout = () => {
    return dispatch =>{
        console.log("sesión cerrada");
        localStorage.removeItem("loggedBlogappUser");
        dispatch(setUser(null))
    }
  };

export const { setUser } = userSlice.actions

export default userSlice.reducer