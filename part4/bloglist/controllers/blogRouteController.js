const jwt = require('jsonwebtoken')

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  
  return null
}

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user',{ username: 1, name: 1})
  
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body._doc ? req.body._doc : req.body
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (body.title === undefined || body.url === undefined ) {
    res.status(400).end()
  }

  const users = await User.find({})
  //const user = await User.find({ token: body.token })
  const userList = users.map(u => u.toJSON())
  //const user = userList[userList.length -  1]
  const tmpId = user.id
  //const user = await User.findById(body.userId)
  
  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: tmpId
  })

  const savedBlog = await blog.save()
  const userToModify = await User.findById(tmpId)
  userToModify.blogs = userToModify.blogs.concat(savedBlog._id)
  await userToModify.save()


  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res, next) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res, next) => {

  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.status(200).end()
})

module.exports = blogsRouter
