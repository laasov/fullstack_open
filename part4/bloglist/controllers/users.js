const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  //const userObjects = users.map (u => User ({}))
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const {username, name, password} = req.body

  if (username.length < 3 || password.length < 3) {
    res
      .status(400)
      .send('Username and password must be have at least 3 symbols')
      .end()
  }

  const users = User.find({})
  const unames = users.map(u => u.username)

  if (unames.includes(username)) {
    res
      .status(400)
      .send('Username must be unique')
      .end()
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

module.exports = usersRouter