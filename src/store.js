import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";
import errorMessageReducer from "./reducers/errorMessageReducer.js";

const store = configureStore({
    reducer:{
        blogs:blogReducer,
        user:userReducer,
        notification:notificationReducer,
        error: errorMessageReducer
    }
})

store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
  })

export default store