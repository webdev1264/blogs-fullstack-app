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

blogRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Blog.findByIdAndRemove(id);
    res.status(204).end();
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

blogRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const updatedBlog = req.body;
  try {
    const returnedBlog = await Blog.findByIdAndUpdate(id, updatedBlog, {
      new: true,
      runValidators: true,
      context: "query",
    });
    res.json(returnedBlog);
  } catch (e) {
    next(e);
  }
});

module.exports = blogRouter;
