import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { setNotificationWithTimeout } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const togglableRef = useRef()

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
  }

  const userNameStyle = {
    marginRight: '10px'
  }

  const togglableStyle = {
    marginBottom: '20px'
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Login error:', exception)
      dispatch(setNotificationWithTimeout({ type: 'error', text: 'wrong username or password' }, 5))
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      dispatch(setNotificationWithTimeout({ type: 'success', text: `a new blog ${newBlog.title} by ${newBlog.author} added` }, 5))
      togglableRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotificationWithTimeout({ type: 'error', text: 'Error adding blog' }, 5))
    }
  }

  const handleLike = async (id, updatedBlogData) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlogData)
      const originalBlog = blogs.find((blog) => blog.id === id)

      const updatedBlog = { ...returnedBlog, user: originalBlog.user }

      const updatedBlogs = blogs
        .map((blog) => (blog.id !== id ? blog : updatedBlog))
        .sort((a, b) => b.likes - a.likes)

      setBlogs(updatedBlogs)
    } catch (exception) {
      dispatch(setNotificationWithTimeout({ type: 'error', text: 'Error updating blog' }, 5))
    }
  }

  const handleRemove = async (id) => {
    try {
      await blogService.remove(id)
      const updatedBlogs = blogs.filter((blog) => blog.id !== id)
      setBlogs(updatedBlogs)
    } catch (exception) {
      dispatch(setNotificationWithTimeout({ type: 'error', text: 'Error removing blog' }, 5))
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <Togglable buttonLabel="login" ref={togglableRef}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <div style={userInfoStyle}>
        <p style={userNameStyle}>{user.name} logged-in</p>
        <button onClick={handleLogout}>logout</button>
      </div>

      <div style={togglableStyle}>
        <Togglable buttonLabel="create new blog" ref={togglableRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlogList={handleLike}
          removeBlog={handleRemove}
          currentUser={user}
        />
      ))}
    </div>
  )
}

export default App
