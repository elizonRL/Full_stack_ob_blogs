const blogRouter = require("express").Router();
const Blog = require("../models/blog");


blogRouter.get("/", async (req, res, next) => {
  const blogs = await Blog.find({});
 try {
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", (req, res) => {
  const blog = new Blog(req.body);
  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = blogRouter;
