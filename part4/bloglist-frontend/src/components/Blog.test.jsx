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

let container

// eslint-disable-next-line no-undef
/* beforeEach(() => {
  container = render(
    <Togglable buttonLabel="show...">
      <div className="testDiv" >
        togglable content
      </div>
    </Togglable>
  ).container
}) */

// eslint-disable-next-line no-undef
test('Renders the "Blog" component', async () => {
  render(<Blog
    blog={testBlog}
    likes={testBlog.likes}
    user={testUser}/>
  )

})

test('Renders title and author', async () => {
  render(<Blog
    blog={testBlog}
    likes={testBlog.likes}
    user={testUser}/>
  )

  const title = await screen.getByText(testBlog.title)
  const author = await screen.getByText(testBlog.author)

  expect(title).toBeDefined()
  expect(author).toBeDefined()
})

test('Does not render URL and number of likes', async () => {
  render(<Blog
    blog={testBlog}
    likes={testBlog.likes}
    user={testUser}/>
  )
})

test('renders Togglable', () => {
  const { container } = render(<Blog
    blog={testBlog}
    likes={testBlog.likes}
    user={testUser}/>
  )
  const div = container.querySelector('.toggleContent')
  screen.debug(div)
})