const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body._doc

  if (body.title === undefined || body.url === undefined ) {
    res.status(400).end()
  }
  
  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  })

  const savedBlog = await blog.save()

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
