import { useState } from 'react'

const Blog = ({ blog, updateBlogList, removeBlog, currentUser }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    updateBlogList(blog.id, updatedBlog)
  }

  const handleRemove = async () => {
    const confirmRemove = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirmRemove) {
      removeBlog(blog.id)
    }
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }


  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
          <p>{blog.user.name}</p>
          {currentUser.name === blog.user.name && (
            <button onClick={handleRemove}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog