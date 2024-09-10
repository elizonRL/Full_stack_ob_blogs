const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (req, res, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs)
})

blogRouter.post('/', async (req, res, next) => {
  const { title, author, url, likes } = req.body
  const user = await User.findById('66e03ea59ecbc3e13d50fc3e')
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id
  })
  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()
  res.status(201).json(newBlog)
})
blogRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  await Blog.findByIdAndDelete(id)
  res.status(204).send()
})

module.exports = blogRouter
