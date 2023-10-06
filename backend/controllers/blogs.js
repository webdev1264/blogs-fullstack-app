const express = require("express");
const Blog = require("../models/blog");
const blogRouter = express.Router();

blogRouter.get("/", (req, res, next) => {
  Blog.find({})
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((e) => {
      next(e);
    });
});

blogRouter.post("/", (req, res, next) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((savedBlog) => {
      res.status(201).json(savedBlog);
    })
    .catch((e) => {
      next(e);
    });
});

module.exports = blogRouter;
