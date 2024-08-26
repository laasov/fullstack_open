const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')

const initialBlogs = [
  { title: "Spaten",
    author: "Lassi",
    url: "www.spatenfakeurl.nam",
    likes: 1000,
  },
  { title: "Paulaner",
    author: "Lassi",
    url: "www.whaaaaat.wtf",
    likes: 100,
  },
  { title: "Wasser",
    author: "BigBang",
    url: "www.vanhinvoitehista.yes",
    likes: 100,
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

after(async () => {
  await mongoose.connection.close()
})