const { countBy, maxBy, toPairs, last } = require('lodash')

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const maxLikes = Math.max(...blogs.map(b => b.likes))
  const favorite = blogs.find(b => b.likes === maxLikes)

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogsCountByAuthor = countBy(blogs, 'author')
  const authorPairs = toPairs(blogsCountByAuthor)
  const maxPair = maxBy(authorPairs, last)
  const mostBlogsAuthor = maxPair[0]

  return {
    author: mostBlogsAuthor,
    blogs: blogsCountByAuthor[mostBlogsAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorLikes = blogs.reduce((acc, { author, likes }) => {
    acc[author] = (acc[author] || 0) + likes
    return acc
  }, {})

  const authorLikesPairs = toPairs(authorLikes)
  
  const mostLikedAuthorPair = maxBy(authorLikesPairs, ([, likes]) => likes)

  return {
    author: mostLikedAuthorPair[0],
    likes: mostLikedAuthorPair[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}