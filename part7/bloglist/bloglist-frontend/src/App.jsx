import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import Navigation from './components/Navigation'
import User from './components/User'
import BlogDetail from './components/BlogDetail'
import { setNotificationWithTimeout } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, handleLike, handleRemove } from './reducers/blogReducer'
import { Typography, Container } from '@mui/material'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const togglableRef = useRef()
  const blogs = useSelector(state => state.blogs)

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
    dispatch(initializeBlogs())
  }, [dispatch])

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
      dispatch(createBlog(blogObject))
      dispatch(setNotificationWithTimeout({ type: 'success', text: `a new blog ${blogObject.title} by ${blogObject.author} added` }, 5))
      togglableRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotificationWithTimeout({ type: 'error', text: 'Error adding blog' }, 5))
    }
  }

  const BlogsList = () => (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Blogs
      </Typography>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlogList={() => dispatch(handleLike(blog.id, { ...blog, likes: blog.likes + 1 }))}
          removeBlog={() => dispatch(handleRemove(blog.id))}
          currentUser={user}
        />
      ))}
    </Container>
  )

  if (user === null) {
    return (
      <Container>
        <Typography variant="h4" component="h2" gutterBottom>
          Log in to application
        </Typography>
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
      </Container>
    )
  }

  return (
    <Container>
      <Navigation user={user} handleLogout={handleLogout} />
      <Notification />

      <div style={togglableStyle}>
        <Togglable buttonLabel="create new blog" ref={togglableRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      <Routes>
        <Route path="/" element={<BlogsList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </Container>
  )
}

export default App
