import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { Error } from './components/ErrorMessage'
import { NewBlogForm } from './components/NewBlogForm'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage ,setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        setBlogs(blogs);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  console.log('blogs: ',blogs)

  const blogFormRef = useRef()

  const createNewBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    e.preventDefault()
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const updateBlog =()=>{
    
  }

  const handleLogin = async (e) =>{
    e.preventDefault()
    console.log('loggin in with ', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Username or Password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout =()=>{
    console.log('sesión cerrada')
    localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  if (user === null){
    return(
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
        </form>
        <Error message={errorMessage} />   
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <p>{user.username} logged in<button onClick={handleLogout}>logout</button></p>

      <Togglable firstButtonLabel='Create Blog' secondButtonLabel='cancel' ref={blogFormRef}>
          <NewBlogForm createNewBlog={createNewBlog}/>
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App