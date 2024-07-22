import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card, CardContent, Typography, List, ListItem } from '@mui/material'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(user => user.id === id))

  if (!user) {
    return null
  }

  return (
    <Card style={{ marginTop: '16px' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="h5" gutterBottom>
          added blogs
        </Typography>
        <List>
          {user.blogs.map(blog => (
            <ListItem key={blog.id}>
              <Typography>{blog.title}</Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default User
