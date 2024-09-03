const { test, after, beforeEach } = require('node:test')

const User = require('../models/user')
const app = require('../app')

const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const api = supertest(app)

const initialUsers = [
  { 
    _id: '5a422aa71b54a676234d17f8',
    username: 'Saukko',
    name: 'Aukko',
    password: 'Lohi',
    __v: 0
  },
  { 
    _id: '5a422aa71b54a676234d17f7',
    username: 'Siili',
    name: 'Viili',
    password: 'Harri',
    __v: 0
  },
]

beforeEach(async () => {
  await User.deleteMany({})
  
  let userObject = new User(initialUsers[0])
  await userObject.save()
  
  userObject = new User(initialUsers[1])
  await userObject.save()

})

test('Users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Posting faulty username returns status code 400', async () => {
  const shortUsername = {
    username: 'ab',
    name: 'cd',
    password: 'abcd'
  }

  await api
    .post('/api/users')
    .send(shortUsername)
    .expect(400)
})

test('Posting faulty password returns status code 400', async () => {
  const shortPassword = {
    username: 'abcd',
    name: 'ef',
    password: 'ab'
  }
  
  await api
    .post('/api/users')
    .send(shortPassword)
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})