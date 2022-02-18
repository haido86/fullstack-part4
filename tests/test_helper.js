const Blog = require("../models/blog");

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

module.exports = {
  initialBlogs,
  blogsInDb,
};
