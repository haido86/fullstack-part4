const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

// test("blogs are returned as json", async () => {
//   await api
//     .get("/api/blogs")
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
// }, 100000);

// beforeEach(async () => {
//   await Blog.deleteMany({});
//   let blogObject = new Blog(helper.initialBlogs[0]);
//   await blogObject.save();
//   blogObject = new Blog(helper.initialBlogs[1]);
//   await blogObject.save();
// });

// test("there are 2 blogs", async () => {
//   const response = await api.get("/api/blogs");
//   expect(response.body).toHaveLength(helper.initialBlogs.length);
// }, 100000);

// test("there is existence of  id", async () => {
//   const response = await api.get("/api/blogs");
//   expect(response.body[0].id).toBeDefined();
// }, 100000);

// test("a valid blog can be added ", async () => {
//   const newBlog = {
//     title: "Go anywhere ",
//     author: "nam",
//     url: "String",
//     likes: 82,
//     id: "620c1d58d95045367687a2hf",
//   };

//   await api.post("/api/blogs").send(newBlog);

//   const blogsAtEnd = await helper.blogsInDb();
//   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
// });

// test("a blog with missing Likes field has 0 like", async () => {
//   const newBlog = {
//     title: "Go anywhere else ",
//     author: "Son",
//     url: "String",
//     id: "5",
//   };

//   const response = await api.post("/api/blogs").send(newBlog);
//   console.log("response newBlog", response.body);

//   expect(response.body.likes).toBe(0);
// });

test("a blog without title and url cannot be added", async () => {
  const newBlog = {
    author: "Jimmy",
    id: 7,
    likes: 23,
  };

  const response = await api.post("/api/blogs").send(newBlog);
  console.log("response newBlog", response.body);
  expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
