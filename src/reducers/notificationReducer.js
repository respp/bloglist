import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name : 'notification',
    initialState : null,
    reducers : {
        setNotification(state, action){
            return action.payload
        }
    }
})

//***************** REDUX THUNK ******************/

export const notification = (message, time) =>{//message
    return dispatch =>{
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(setNotification(null))
        }, 1000 * time);
    }
}

export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer