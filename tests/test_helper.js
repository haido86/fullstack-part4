const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Going to cinema",
    author: "Hanna Q.",
    url: "String",
    likes: 72,
    id: "3",
  },
  {
    title: "Going ",
    author: "Jack M.",
    url: "String",
    likes: 92,
    id: "2",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
