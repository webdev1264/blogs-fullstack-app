const express = require("express");
const Blog = require("../models/blog");
const blogRouter = express.Router();

blogRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});

blogRouter.post("/", async (req, res, next) => {
  const blog = new Blog(req.body);
  try {
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (e) {
    next(e);
  }
});

module.exports = blogRouter;
