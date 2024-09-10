const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const superTest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const api = superTest(app)
const mongoose = require('mongoose')
const blogHelper = require('../utils/blog_herper')

const userRoot = {
  username: 'root',
  name: 'root',
  password: 'superuser'
}

describe('test creat users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const newUser1 = new User(blogHelper.initialUsers[0])
    await newUser1.save() // save the first user
    const newUser2 = new User(blogHelper.initialUsers[1])
    await newUser2.save() // save the second user
  })
  test('Test json users', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('Test create user', async () => {
    await api
      .post('/api/users')
      .send(userRoot)
      .expect(201)
      .then((response) => {
        assert.strictEqual(response.body.username, 'root')
        assert.strictEqual(response.body.name, 'root')
      })
  })
})

describe('test Errors of users', () => {
  test('Test create user with duplicate user name', async () => {
    const userAtStart = await blogHelper.usersInDb()

    await api.post('/api/users')
      .send({
        username: 'Elizo',
        name: 'elizon Rodriguez',
        password: '123456'
      })
      .expect(400)
    const userAtEnd = await blogHelper.usersInDb()

    assert.strictEqual(userAtEnd.length, userAtStart.length)
  })
  test('test Create user with user name minlength', async () => {
    const userAtStart = await blogHelper.usersInDb()
    await api.post('/api/users')
      .send({
        username: 'XX',
        name: 'elizon Rodriguez',
        password: '123456'
      })
      .expect(400)
    const userAtEnd = await blogHelper.usersInDb()
    assert.strictEqual(userAtEnd.length, userAtStart.length)
  })
  test('test Create user withOut password ', async () => {
    const userAtStart = await blogHelper.usersInDb()
    await api.post('/api/users')
      .send({
        username: 'carlos',
        name: 'elizon Rodriguez'
      })
      .expect(400)
    const userAtEnd = await blogHelper.usersInDb()
    assert.strictEqual(userAtEnd.length, userAtStart.length)
  })
  test('test Create user withOut username ', async () => {
    const userAtStart = await blogHelper.usersInDb()
    await api.post('/api/users')
      .send({
        name: 'elizon Rodriguez',
        password: '123456'
      })
      .expect(400)
    const userAtEnd = await blogHelper.usersInDb()
    assert.strictEqual(userAtEnd.length, userAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
