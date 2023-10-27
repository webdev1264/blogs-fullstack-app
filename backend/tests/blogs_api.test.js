const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});
describe("when there is initially some notes saved", () => {
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blog id field exists", async () => {
    const blogs = await helper.blogsInDb();
    expect(blogs[0].id).toBeDefined();
  });
});

describe("addition of a new note", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Type of tires",
      author: "Martin King",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeTires.html",
      likes: 2,
    };

    const token = await helper.tokenExtractor(api);

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain("Type of tires");
  });
  test("fails adding the blog without authorization", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const newBlog = {
      title: "Type of tires",
      author: "Martin King",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeTires.html",
      likes: 2,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);
    expect(blogsAtStart).toHaveLength(helper.initialBlogs.length);
  });
});
describe("validating blog's fields", () => {
  test("new blog has the likes field", async () => {
    const newBlog = {
      title: "Type of apples",
      author: "Steve Jobs",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeApples.html",
    };

    const token = await helper.tokenExtractor(api);

    const result = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    expect(result.body.likes).toBeDefined();
  });

  test("new blog has the required fields", async () => {
    const blogWithoutTitle = {
      author: "Steve Jobs",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeApples.html",
    };
    const blogWithoutUrl = {
      title: "Type of apples",
      author: "Steve Jobs",
    };

    const token = await helper.tokenExtractor(api);

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blogWithoutTitle)
      .expect(400);
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blogWithoutUrl)
      .expect(400);
  });
});

describe("updating existing blog", () => {
  test("updating the blog with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const { id, user } = blogsAtStart[0];
    const updatedBlog = {
      ...blogsAtStart[0],
      user: user.toString(),
      likes: 10,
    };

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(updatedBlog)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(updatedBlog);
  });
});

describe("deletion of the blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    const token = await helper.tokenExtractor(api);

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
