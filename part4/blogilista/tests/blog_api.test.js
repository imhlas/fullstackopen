const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
  ]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(blogs[0])
  await blogObject.save()
  blogObject = new Blog(blogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog identifier is named id', async () => {
    const response = await api.get('/api/blogs');
    if(response.body.length > 0){
      assert.ok(response.body[0].id, "First blog does not have an 'id'")
    } else {
      assert.fail("No blogs found in the database")
    }
  });
 
test('a valid blog can be added', async () => {

  const newBlog = {
    title: 'Test blog',
    author: 'New Author',
    url: 'http://www.test.com',
    likes: 19,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, blogs.length + 1)

  assert(titles.includes('Test blog'))
})

test('if likes property is missing, it is set to 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Test Author',
    url: 'http://www.example.com',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('blog without title is not added and responds with status 400', async () => {
  const newBlog = {
    author: 'Test Testaaja',
    url: 'http://www.testi.com',
    likes: 4,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400) 
})

test('blog without url is not added and responds with status 400', async () => {
  const newBlog = {
    title: 'No url blog',
    author: 'Author Unknown',
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400) 
})

test('a blog can be deleted', async () => {
  const response = await api.get('/api/blogs')
  const blogToDelete = response.body[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')

  assert.strictEqual(blogsAtEnd.body.length, blogs.length - 1)

  const titles = blogsAtEnd.body.map(r => r.title)

  assert(!titles.includes(blogToDelete.title))
})

test('likes of a blog can be updated', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToUpdate = blogsAtStart.body[0]

  const updatedLikes = blogToUpdate.likes + 1
  const updatedBlog = {
    ...blogToUpdate,
    likes: updatedLikes,
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/api/blogs')
  const updated = blogsAtEnd.body.find(b => b.id === blogToUpdate.id)

  assert.strictEqual(updated.likes, updatedLikes)
})

after(async () => {
await mongoose.connection.close()
})
