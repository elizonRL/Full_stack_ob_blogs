const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const superTest = require("supertest");
const User = require("../models/user");
const app = require("../app");
const api = superTest(app);
const mongoose = require("mongoose");
const blogHelper = require("../utils/blog_herper");

const userRoot = {
  username: "root",
  name: "root",
  password: "superuser",
};

describe("test creat users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    let newUser1 = new User(blogHelper.initialUsers[0]);
    await newUser1.save(); // save the first user
    let newUser2 = new User(blogHelper.initialUsers[1]);
    await newUser2.save(); // save the second user
  });
  test("Test json users", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("Test create user", async () => {
    await api
      .post("/api/users")
      .send(userRoot)
      .expect(201)
      .then((response) => {
        assert.strictEqual(response.body.username, "root");
        assert.strictEqual(response.body.name, "root");
      });
  });
  test("Test create user with duplicate user name", async () => {
    /* const userAtStart = await blogHelper.usersInDb();
    console.log("user At start -->",userAtStart); */
    await api.post("/api/users").send(userRoot).expect(400);
   /*  assert.strictEqual(userAtEnd.length, userAtStart.length); */
  });
});
after(async () => {
  await mongoose.connection.close();
});
