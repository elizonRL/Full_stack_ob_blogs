const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const config = require('../utils/config')

// eslint-disable-next-line no-unused-vars

userRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  const passwordHash = await bcrypt.hash(password, config.SECRE_ROUNDS)
  const user = new User({
    username,
    name,
    passwordHash
  }
)
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    /* .populate('blogs', { url: 1, title: 1, author: 1, id: 1 }) */
  response.json(users)
})

module.exports = userRouter
