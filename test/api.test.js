/* eslint-disable no-prototype-builtins */
const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");

const superTest = require("supertest");

const app = require("../app");

const api = superTest(app);

const Blog = require("../models/blog");
const mongoose = require("mongoose");
const helper = require("../utils/blog_herper");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

describe("GET /", () => {
  test("should return a 200 status code", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("should return the correct number of blogs", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });
  test("shuld be returm id", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body[0].hasOwnProperty("id"), true);
  });
  /*  test("shuld be add new blog", async () => {
    const newBlog = {
      title: "Cómo inicializar Array con valores en JavaScript",
      author: "midudev",
      url: "https://midu.dev/inicializar-array-con-valores/",
      likes: 45,
    };
    await api.post("/api/blogs").send(newBlog).expect(201);
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
  }); */
  test("Shuld be retur a property like", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body[0].hasOwnProperty("likes"), true);
  });
  test("Shuld be retur a property url", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body[0].hasOwnProperty("url"), true);
  });
  test("Shuld be retur a property title", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body[0].hasOwnProperty("title"), true);
  });
  test("shuld be retun delete 1 ", async () => {
    const blogAtStart = await helper.blogsInDb();

    const blogToDelete = blogAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length - 1);
  });
});

after(async () => {
  await mongoose.connection.close();
});
