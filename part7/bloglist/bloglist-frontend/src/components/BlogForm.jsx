import { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        maxWidth: 400,
        margin: 'auto',
        padding: 3,
        border: '1px solid #ccc',
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Blogs
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <TextField
        label="Author"
        variant="outlined"
        fullWidth
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <TextField
        label="URL"
        variant="outlined"
        fullWidth
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
      >
        Create
      </Button>
    </Box>
  )
}


export default BlogForm
