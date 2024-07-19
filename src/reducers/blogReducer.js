import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name : 'blog',
    initialState : [],
    reducers : {
        appendBlog(state, action){
            state.push(action.payload)
        },
        likeTo(state, action){
            const blogToLike = state.find(blog => blog.id === action.payload)
            const likedBlog = {
                ...blogToLike,
                likes : blogToLike.likes + 1
            }
            return state.map(blog => blog.id !== action.payload ? blog : likedBlog
              ).sort((a,b) => b.likes-a.likes)
        },
        removeABlog(state, action){
            const idBlogToRemove = action.payload
            return state.filter(blog => blog.id !== idBlogToRemove)
        },
        setBlogs(state, action){
            return action.payload
        }
    }
})

//***************** REDUX THUNK ******************/

export const initializeBlogs = ()=>{
    return async dispatch => {
        const blogs = await blogService.getAll()
        const sortedBlogs = blogs.sort((a,b) => b.likes-a.likes)
        dispatch(setBlogs(sortedBlogs))
    }
}

export const newBlog = content =>{
    return async dispatch =>{
        const createBlog = await blogService.create(content)
        console.log(createBlog)
        dispatch(appendBlog(createBlog))
    }
}

export const likeABlog = (blogObject, blogId) => {
    return async dispatch => {
        const newBlog = await blogService.update({...blogObject, likes: blogObject.likes + 1}, blogId)
        dispatch(likeTo(newBlog.id))
    }
}

export const deleteBlog = id => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch(removeABlog(id))
    }
}

//export the actions
export const { appendBlog, likeTo, setBlogs, removeABlog } = blogSlice.actions

//export the reducer
export default blogSlice.reducer