const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(v => res.json(v))
})

blogsRouter.post('/', (req, res) => {
  const body = req.body
  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog
    .save()
    .then(s => res.json(s))
})

module.exports = blogsRouter
