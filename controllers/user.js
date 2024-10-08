const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const config = require('../utils/config')

// eslint-disable-next-line no-unused-vars

userRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  if (!password || !username) {
    return response.status(400).json({ error: 'password or user is required' })
  }
  if (password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }

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
    .find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  response.json(users)
})
userRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await User.findByIdAndDelete(id)
  response.status(204).send()
})

module.exports = userRouter
