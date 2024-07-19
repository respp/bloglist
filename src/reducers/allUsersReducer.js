import { createSlice } from "@reduxjs/toolkit"
import usersService from '../services/users'

const allUsersSlice = createSlice({
    name : 'user',
    initialState : [],
    reducers : {
        setAllUsers(state, action){
            return action.payload
        }
    }
})

//***************** REDUX THUNK ******************/

export const initializeAllUsers = ()=>{
    return async dispatch =>{
        const users = await usersService.getAll()
        dispatch(setAllUsers(users))
        }
    }

export const { setAllUsers } = allUsersSlice.actions

export default allUsersSlice.reducer