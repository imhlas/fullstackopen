import React, { useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { handleLike, handleRemove, addComment } from '../reducers/blogReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import { Card, CardContent, Typography, Button, TextField } from '@mui/material'

const BlogDetail = () => {
  const { id } = useParams()
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const currentUser = useSelector(state => state.users.find(user => user.username === user))

  if (!blog) {
    return null
  }

  const likeBlog = () => {
    dispatch(handleLike(blog.id, { ...blog, likes: blog.likes + 1 }))
    dispatch(setNotificationWithTimeout({ type: 'success', text: `Liked ${blog.title}` }, 5))
  }

  const removeBlog = () => {
    const confirmRemove = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (confirmRemove) {
      dispatch(handleRemove(blog.id))
      dispatch(setNotificationWithTimeout({ type: 'success', text: `Removed ${blog.title}` }, 5))
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog.id, comment))
    setComment('')
    dispatch(setNotificationWithTimeout({ type: 'success', text: `Comment added to ${blog.title}` }, 5))
  }

  return (
    <Card>
      <CardContent>
        <h2>{blog.title} by {blog.author}</h2>
        <p>
          <a href={blog.url}>
            {blog.url}
          </a>
        </p>
        <p>
          {blog.likes} likes
          <Button onClick={likeBlog} style={{ marginLeft: '8px', backgroundColor: '#3f51b5', color: 'white' }}>
            like
          </Button>
        </p>
        <p>added by {blog.user.name}</p>
        {currentUser && blog.user.username === currentUser.username && (
          <Button onClick={removeBlog}>
            remove
          </Button>
        )}

        <form onSubmit={handleComment}>
          <TextField
            label="Add a comment"
            fullWidth
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button type="submit" style={{ backgroundColor: '#3f51b5', color: 'white' }}>
            add comment
          </Button>
        </form>
        <h3>Comments</h3>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>
              <Typography>{comment}</Typography>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
export default BlogDetail
