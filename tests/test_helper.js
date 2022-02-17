const Blog = require("../models/blog");

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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
