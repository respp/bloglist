import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders content', () => {
    const blog = {
      title: 'Harry Potter',
      author: 'la autora de harry potter',
      url: 'harrypoter.com',
      likes: 3
    }

    const mockHandler = vi.fn()

    const { container } = render(<Blog blog={blog} />)
    render(<Blog blog={blog}  />)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      /Harry Potter/
    )
    expect(div).toHaveTextContent(
      /la autora de harry potter/
    )
    screen.debug() //Mostrar el Blog en consola

  })
})
