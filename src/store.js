import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";
import errorMessageReducer from "./reducers/errorMessageReducer.js";
import allUsersReducer from "./reducers/allUsersReducer.js";

const store = configureStore({
    reducer:{
        blogs:blogReducer,
        user:userReducer,
        notification:notificationReducer,
        error: errorMessageReducer,
        users:allUsersReducer
    }
})

export default store