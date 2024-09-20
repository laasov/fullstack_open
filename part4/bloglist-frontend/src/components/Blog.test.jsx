import { getByText, render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import { within } from '@testing-library/dom'

import Blog from './Blog'

// eslint-disable-next-line no-undef
test('Default display renders title and author, but not URL or likes', () => {
  const testBlog = {
    title: 'dummy title',
    author: 'imbecile author',
    url: 'www.wow.wow',
    likes: 1
  }

  const testUser = {
    name: 'batman',
    username: 'kilohaili'
  }

  render(<Blog
    blog={testBlog}
    likes={testBlog.likes}
    user={testUser} />)

  const out = screen.getAllByText('dummy title')


  /* const { container } = render(<Blog blog={testBlog} likes={testBlog.likes} user={testUser} />)

  const div = container.querySelector('.blog')

  console.log(div)

  expect(div).toHaveTextContent('dummy title') */

  //const { nonTogglable } = within(screen.getByPlaceholderText('non togglable'))
  //expect(getByText('dummy title')).toBeInTheDocument()

  //screen.debug(nonTogglable)
  /* expect(author).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined() */

})