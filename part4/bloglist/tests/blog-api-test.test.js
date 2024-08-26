const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')

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

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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

// 4.9.
test('blog posts are identified by the property "id"', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  const res = blogs.map( blog => Object.hasOwn(blog, 'id'))

  assert.strictEqual(true, res.every(val => val === true))
})

// 4.10
test('HTTP POST to /api/blogs increases blog count by one"', async () => {
  let response = await api.get('/api/blogs')
  const initialCount = response.body.length

  const newBlog = Blog ({
    _id: '5a422aa71b54a676234d17f6',
    title: 'Test Blog',
    author: 'Hammurabi',
    url: 'www.gochujang.hot',
    likes: 100000000,
    _v: 0
  })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  response = await api.get('/api/blogs')
  const newCount = response.body.length

  assert.strictEqual(newCount, initialCount + 1)
})

after(async () => {
  await mongoose.connection.close()
})