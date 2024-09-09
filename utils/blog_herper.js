const Blog = require('../models/blog')
const User = require('../models/user')

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
const initialUsers = [
  {
    username: 'Elizo',
    name: 'elizon Rodriguez',
    passwordHash: 'elizon'
  },
  {
    username: 'dani',
    name: 'daniel',
    passwordHash: 'pedro'
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
  blogsInDb,
  initialUsers,
  usersInDb
}
