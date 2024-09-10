const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (req, res, next) => {
  const user = await User.findById(req.userId)
  console.log('user', user)
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.post('/', async (req, res, next) => {
  const blog = new Blog(req.body)
  const newBlog = await blog.save()
  res.status(201).json(newBlog)
})
blogRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  await Blog.findByIdAndDelete(id)
  res.status(204).send()
})

module.exports = blogRouter
