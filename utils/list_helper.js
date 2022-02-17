const _ = require("lodash");

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
  const numberOfBlogsForEachAuthor = _.countBy(
    blogs.map((blog) => blog.author)
  );
  const maxBlogsCount = _.max(_.values(numberOfBlogsForEachAuthor));
  const maxBlogsAuthor = _.findKey(numberOfBlogsForEachAuthor, function (o) {
    return o === maxBlogsCount;
  });
  return { author: maxBlogsAuthor, blogs: maxBlogsCount };
};

const mostLikes = (blogs) => {
  const authors = _.uniq(blogs.map((blog) => blog.author)).map((author) => {
    const likes = _.sumBy(blogs, function (o) {
      return o.author === author ? o.likes : 0;
    });
    return { author, likes };
  });

  const maxLikesAuthor = _.maxBy(authors, "likes");

  return maxLikesAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
