const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogRouteController')
const config = require('./utils/config')
const logger = require('./utils/logger')

const mongoUrl = config.MONGODB_URI

logger.info('Connecting to MongoDB...')

mongoose
  .connect(mongoUrl)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((e) => logger.error('Error connecting to MongoDB', e.message))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app