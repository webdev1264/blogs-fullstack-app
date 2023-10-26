const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      name: 1,
      userName: 1,
    });
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});

blogRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = req.user;

    const blogFromDb = await Blog.findById(id);

    if (user._id.toString() === blogFromDb.user.toString()) {
      user.blogs = user.blogs.filter(
        (blog) => blog.toString() !== blogFromDb._id.toString()
      );
      await blogFromDb.deleteOne();
      await user.save();
    }
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

blogRouter.post("/", async (req, res, next) => {
  const { title, author, url, likes } = req.body;
  try {
    const user = req.user;

    const blog = new Blog({ title, author, url, likes, user: user.id });
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

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
