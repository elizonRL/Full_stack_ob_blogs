const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Top 5 preguntas de JavaScript en Stack Overflow',
    author: "midudev",
    url: "https://midu.dev/top-5-preguntas-javascript-stack-overflow/",
    likes: 45,
  },
  {
    title: "Cómo leer, copiar y pegar del portapapeles en JavaScript",
    author: "midudev",
    url: "https://midu.dev/leer-copiar-pegar-portapapeles-javascript/",
    likes: 35,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}
