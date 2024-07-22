import { Link as RouterLink } from 'react-router-dom'
import { Card, CardContent, Typography, Link } from '@mui/material'

const Blog = ({ blog }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Link component={RouterLink} to={`/blogs/${blog.id}`} underline="none">
          <Typography variant="h6" component="div">
            {blog.title} {blog.author}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  )
}

export default Blog
