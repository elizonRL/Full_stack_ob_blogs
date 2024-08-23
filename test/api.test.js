const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");

const superTest = require("supertest");

const app = require("../app");

const api = superTest(app);

const Blog = require("../models/blog");
const mongoose = require("mongoose");
const initialBlogs = [
  {
    title: "Top 5 preguntas de JavaScript en Stack Overflow",
    author: "midudev",
    url: "https://midu.dev/top-5-preguntas-javascript-stack-overflow/",
    likes: 45,
  },
  {
    title: "Cómo leer, copiar y pegar del portapapeles en JavaScript",
    author: "midudev",
    url: "https://midu.dev/leer-copiar-pegar-portapapeles-javascript/",
    likes: 35,
  },
];
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
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
    assert.strictEqual(response.body.length, initialBlogs.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
