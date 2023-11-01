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
    if (!req.user) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = req.user;

    const blogFromDb = await Blog.findById(id);

    console.log(blogFromDb);

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
  const { title, author, url } = req.body;

  try {
    if (!req.user) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = req.user;

    const blog = new Blog({ title, author, url, user: user.id });
    const savedBlog = await blog.save();
    await savedBlog.populate("user", {
      name: 1,
      userName: 1,
    });

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

blogRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const updatedBlog = req.body;
  if (!req.user) {
    return res.status(401).json({ error: "Invalid token" });
  }
  const user = req.user;
  try {
    const returnedBlog = await Blog.findByIdAndUpdate(
      id,
      { ...updatedBlog, user: user.id },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );
    res.json(returnedBlog);
  } catch (e) {
    next(e);
  }
});

module.exports = blogRouter;
