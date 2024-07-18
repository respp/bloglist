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
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token)
      dispatch({ type: "user/setUser", payload: user })
    }
}

export const login = credentials =>{
    return async dispatch => {
        const user = await loginService.login(credentials)
        dispatch(setUser(user))
    }
}

export const { setUser } = userSlice.actions

export default userSlice.reducer