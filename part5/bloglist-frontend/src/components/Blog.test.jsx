import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content, shows title but not url or likes by default', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: { name: 'Test User' } }

  render(<Blog blog={blog} />)

  const titleAndAuthorElement = screen.getByText('Test Blog Title Test Author')
  expect(titleAndAuthorElement).toBeDefined()

  const urlElement = screen.queryByText('http://testblog.com')
  expect(urlElement).toBeNull()

  const likesElement = screen.queryByText('likes 5')
  expect(likesElement).toBeNull()
})

test('url and likes are shown when the view button is clicked', async () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: { name: 'Test User' } }

  render(<Blog blog={blog} currentUser={blog.user} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const urlElement = screen.getByText('http://testblog.com')
  expect(urlElement).toBeDefined()

  const likesElement = screen.getByText('likes 5')
  expect(likesElement).toBeDefined()
})


test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: { name: 'Test User' } }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} updateBlogList={mockHandler} currentUser={blog.user} />)

  const user = userEvent.setup()

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})


