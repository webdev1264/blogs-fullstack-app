const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    user: "653a519061ce4cd814680791",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    user: "653a519061ce4cd814680791",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    user: "653a519061ce4cd814680791",
    likes: 12,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const passwordHash = async (password, saltRounds = 10) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const tokenExtractor = async (api) => {
  const loginCredentials = {
    userName: "andrik1264",
    password: "@ndrik",
  };

  const loginResponse = await api
    .post("/api/login")
    .send(loginCredentials)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  return loginResponse.body.token;
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  passwordHash,
  tokenExtractor,
};
