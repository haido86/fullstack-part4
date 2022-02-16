const { countBy, max, values, findKey } = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    return total + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const maxLikes = blogs
    .map((blog) => blog.likes)
    .reduce((a, b) => Math.max(a, b), 0);
  return blogs.find((blog) => blog.likes === maxLikes);
};

const mostBlogs = (blogs) => {
  const numberOfBlogsForEachAuthor = countBy(blogs.map((blog) => blog.author));
  const maxCount = max(values(numberOfBlogsForEachAuthor));
  const maxAuthor = findKey(numberOfBlogsForEachAuthor, function (o) {
    return o === maxCount;
  });
  return { author: maxAuthor, blogs: maxCount };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
