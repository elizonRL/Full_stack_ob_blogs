const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const superTest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('../utils/blog_herper')

const api = superTest(app)

const user = {
  username: 'Elizon',
  password: 'elizon'
}

beforeEach(async () => {
  await User.deleteMany({})
  const newUser = new User(helper.initialUsers[0])
  await newUser.save()
})
describe('test about user login an check token', () => {
  test('test login', async () => {
    const response = await api.post('/api/login').send(user)
    assert.strictEqual(response.status, 200)
    assert.strictEqual(response.body.username, user.username)
  })

  test('test check token', async () => {
    const response = await api.post('/api/login').send(user)
    const token = response.body.token
    const responseCheck = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
    assert.strictEqual(responseCheck.status, 200)
  })
})

after(async () => {
  await mongoose.connection.close()
})
