const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const superTest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const api = superTest(app)
const mongoose = require('mongoose')

describe('test creat users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })
  test('Test json users', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('Test create user', async () => {
    await api.post('/api/users').send({
      username: 'root',
      name: 'root',
      password: 'sueperuser'
    }).expect(201)
      .then(response => {
        assert.strictEqual(response.body.username, 'root')
        assert.strictEqual(response.body.name, 'root')
      })
  })
  /* test('Test create user without password', async () => {
    await api.post('/api/users').send({
      username: 'XXXX',
      name: 'root'
    }).expect(400)
    const response = await api.get('/api/users')
    assert.strictEqual(response.body.length, 0)
  }) */
})
after(async () => {
  await mongoose.connection.close()
})
