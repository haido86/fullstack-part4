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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
