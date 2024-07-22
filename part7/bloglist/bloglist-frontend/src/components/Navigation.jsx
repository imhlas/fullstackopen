import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'

const Navigation = ({ user, handleLogout }) => {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/users" color="inherit">Users</Button>
        </Box>
        <Typography variant="h6" component="div" sx={{ mr: 2 }}>
          {user.name} logged in
        </Typography>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
