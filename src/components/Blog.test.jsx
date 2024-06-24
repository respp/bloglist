import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blog', () => {
  const blog = {
    id: '1',
    title: 'Harry Potter',
    author: 'la autora de harry potter',
    url: 'harrypoter.com',
    likes: 3
  }
  let container
  let likeMock
  let mockUpdateBlog

  beforeEach(() => {
    mockUpdateBlog = vi.fn()
    likeMock = vi.fn()
    container = render(<Blog blog={blog} handleLike={likeMock} handleDelete={null} ownedByUser={false} updateBlog={mockUpdateBlog}></Blog>).container
  })

  test('initially title is rendered', () => {
    expect(container).toHaveTextContent('Harry Potter')
  })

  test('initially author is rendered', () => {
    expect(container).toHaveTextContent('la autora de harry potter')
  })

  test('initially url is not rendered', () => {
    expect(container).not.toHaveTextContent('harrypoter.com')
  })

  test('initially likes not defined', () => {
    expect(container).not.toHaveTextContent('3')
  })

  test('blog\'s url and number of likes are shown when button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Details', { exact: false }) //exact:false es que no necesitamos coincidencia exacta del texto
    await user.click(button)

    expect(container).toHaveTextContent('harrypoter.com')
    expect(container).toHaveTextContent('3')
  })

  test('when the like button is clicked twice, the event handler is called twice', async () => {
    const detailsButton = await screen.findByText('Details')
    await userEvent.click(detailsButton)

    const likeButton = await screen.findByText('Like')

    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(mockUpdateBlog).toHaveBeenCalledTimes(2)
  })
})