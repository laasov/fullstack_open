const { test, after, beforeEach } = require('node:test')

const Blog = require('../models/blog')
const app = require('../app')

const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const api = supertest(app)

const initialBlogs = [
  { 
    _id: '5a422aa71b54a676234d17f8',
    title: "Spaten",
    author: "Lassi",
    url: "www.spatenfakeurl.nam",
    likes: 1000,
    __v: 0
  },
  { 
    _id: '5a422aa71b54a676234d17f7',
    title: "Paulaner",
    author: "Lassi",
    url: "www.whaaaaat.wtf",
    likes: 100,
    __v: 0
  },
  { 
    _id: '5a422aa71b54a676234d17f6',
    title: "Wasser",
    author: "BigBang",
    url: "www.vanhinvoitehista.yes",
    likes: 100,
    __v: 0
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are exactly three blog posts', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

// 4.9
test('blog posts are identified by the property "id"', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  const res = blogs.map( blog => Object.hasOwn(blog, 'id'))

  assert.strictEqual(true, res.every(val => val === true))
})

// 4.10
test('HTTP POST to /api/blogs increases blog count by one"', async () => {

  const newBlog = Blog ({
    title: 'Test Blog',
    author: 'Hammurabi',
    url: 'www.gochujang.hot',
    likes: 100000000,
  })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const response = await api.get('/api/blogs')
  const newCount = response.body.length

  const contents = response.body.map(r => r.title)

  assert.strictEqual(newCount, initialBlogs.length + 1)
  // Test "Correct saving", i.e., that the response actually contains at sent data
  assert(contents.includes('Test Blog'))
})

// 4.11
test('If request contains no likes, defults to  0', async () => {

  const newBlog = Blog ({
    title: 'Gods do not like it',
    author: 'Sun Wukong',
    url: 'www.stolenpeaches.omg',
  })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.likes)

  assert(contents.includes(0))
})

// 4.12
test('If request does not contain title, backend responds with 400', async () => {

  const newBlog = Blog ({
    author: 'Mao',
    url: 'www.tofu.cat',
  })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

// 4.12
test('If request does not contain url, backend responds with 400', async () => {

  const newBlog = Blog ({
    title: 'Yeaaah',
    author: 'Who'
  })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

after(async () => {
  await mongoose.connection.close()
})