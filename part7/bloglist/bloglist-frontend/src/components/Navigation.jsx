import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({ user, handleLogout }) => {
  const navStyle = {
    backgroundColor: 'lightgrey',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }

  const linkStyle = {
    marginRight: '10px'
  }

  return (
    <div style={navStyle}>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/users" style={linkStyle}>Users</Link>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default Navigation
