const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'Top 5 preguntas de JavaScript en Stack Overflow',
    author: 'midudev',
    url: 'https://midu.dev/top-5-preguntas-javascript-stack-overflow/',
    likes: 45
  },
  {
    title: 'Cómo leer, copiar y pegar del portapapeles en JavaScript',
    author: 'midudev',
    url: 'https://midu.dev/leer-copiar-pegar-portapapeles-javascript/',
    likes: 35
  }
]
const initialUsers =  [
  {
    username: 'Elizon',
    name: 'elizon Rodriguez',
    passwordHash:  bcrypt.hashSync('elizon', 10)
  },
  {
    username: 'dani',
    name: 'daniel',
    passwordHash: bcrypt.hashSync('daniel', 10)
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb
}
