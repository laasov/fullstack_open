import { getByText, render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import { within } from '@testing-library/dom'


import Blog from './Blog'
//import Togglable from './Togglable'

const testBlog = {
  title: 'dummy',
  author: 'imbecile',
  url: 'www.wow',
  likes: 1
}

const testUser = {
  name: 'batman',
  username: 'kilohaili'
}

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Blog
        blog={testBlog}
        likes={testBlog.likes}
        user={testUser}
      />
    ).container
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('div[style*="display: none"]')
    expect(div).toBeInTheDocument()
  })

})

// eslint-disable-next-line no-undef


// eslint-disable-next-line no-undef
test('Renders the "Blog" component', async () => {
  render(<Blog
    blog={testBlog}
    likes={testBlog.likes}
    user={testUser}/>
  )

})

test('Renders title and author', () => {
  render(<Blog
    blog={testBlog}
    likes={testBlog.likes}
    user={testUser}/>
  )

  const title = screen.getByText(testBlog.title)
  const author = screen.getByText(testBlog.author)

  expect(title).toBeDefined()
  expect(author).toBeDefined()
})

/* test('Does not render URL and number of likes', async () => {
  const { container } = render(<Blog
    blog={testBlog}
    likes={testBlog.likes}
    user={testUser}/>
  )

  const div = container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')

}) */

/* test('renders Togglable', () => {
  render(<Blog
    blog={testBlog}
    likes={testBlog.likes}
    user={testUser}/>
  )
  screen.getByPlaceholderText('click to toggle')
}) */