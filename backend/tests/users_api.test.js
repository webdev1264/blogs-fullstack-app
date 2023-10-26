const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await helper.passwordHash("@ndrik");
  const user = new User({
    name: "Andre",
    userName: "andrik1264",
    passwordHash,
  });
  user.save();
});

describe("validation tests", () => {
  test("failed creating user with invalid userName", async () => {
    const usersAtStart = await helper.usersInDb();
    const user = {
      name: "Andres",
      userName: "an",
      password: "@ndrik",
    };
    await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtStart).toHaveLength(usersAtEnd.length);
  });
  test("failed creating user with invalid password", async () => {
    const usersAtStart = await helper.usersInDb();
    const user = {
      name: "Andres",
      userName: "andres1987",
      password: "12",
    };
    await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtStart).toHaveLength(usersAtEnd.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
