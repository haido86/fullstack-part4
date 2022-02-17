const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

const initialBlogs = [
  {
    title: "Going to cinema",
    author: "hag",
    url: "String",
    likes: 72,
    id: "620c0acac6c7ea818379f9bf",
  },
  {
    title: "Going ",
    author: "hhgk",
    url: "String",
    likes: 92,
    id: "620c1d58d95045367687a2ff",
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("there are 2 blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(2);
}, 100000);

afterAll(() => {
  mongoose.connection.close();
});
