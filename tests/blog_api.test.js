const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// test("blogs are returned as json", async () => {
//   await api
//     .get("/api/blogs")
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
// }, 100000);

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

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

//   expect(response.body.likes).toBe(0);
// });

// test("a blog without title and url cannot be added", async () => {
//   const newBlog = {
//     author: "Jimmy",
//     id: 7,
//     likes: 23,
//   };

//   const response = await api.post("/api/blogs").send(newBlog).expect(400);
//   const blogsAtEnd = await helper.blogsInDb();

//   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
// });

// test("a blog can be deleted", async () => {
//   const blogsAtStart = await helper.blogsInDb();
//   const blogToDelete = blogsAtStart[0];

//   await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

//   const blogsAtEnd = await helper.blogsInDb();

//   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
// });

// test("a blog-like field can be edited", async () => {
//   const blogsAtStart = await helper.blogsInDb();
//   const blogToBeEdited = blogsAtStart[0];
//   const updatedLikes = { likes: 90 };

//   const updatedBlog = await api
//     .put(`/api/blogs/${blogToBeEdited.id}`)
//     .send(updatedLikes);

//   expect(updatedBlog.body.likes).toBe(updatedLikes.likes);
// });

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "mia_truong", passwordHash });

    await user.save();
  });

  test("existing username cannot be added", async () => {
    const newUser = {
      username: "mia_truong",
      name: "Mia Truong",
      password: "secret",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);

    expect(response.body.error).toBe("username must be unique");
  });
});

test("username must be at least 3 character long", async () => {
  const newUser = {
    username: "rt",
    name: "Mia Truong",
    password: "secret",
  };

  const response = await api.post("/api/users").send(newUser).expect(400);

  expect(response.body.error).toBe(
    "username must be at least 3 characters long"
  );
});

test("password must be at least 3 character long", async () => {
  const newUser = {
    username: "liam_truong",
    name: "Liam Truong",
    password: "se",
  };

  const response = await api.post("/api/users").send(newUser).expect(400);

  expect(response.body.error).toBe(
    "password must be at least 3 characters long"
  );
});

afterAll(() => {
  mongoose.connection.close();
});
