var _ = require('lodash/core');
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const blogLikes = blogs.map((blog) => blog.likes);

  const sumReducer = (item, sum) => item + sum;

  return blogLikes.length === 0 ? 0 : blogLikes.reduce(sumReducer, 0);
};

const favoriteBlog = (blogs) => {
  const highestReducer = (item, sum) => (item.likes > sum.likes ? item : sum);

  return blogs.length === 0 ? {} : blogs.reduce(highestReducer, 0);
};

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  const authorCounts = {};
  for (var i = 0; i < authors.length; i++) {
    authorCounts[authors[i]] = 1 + (authorCounts[authors[i]] || 0);
  }
  const authorBlogs = Object.entries(authorCounts).map(
    (authorBlog) =>
      new Object({
        author: authorBlog[0],
        blogs: authorBlog[1],
      })
  );

  const highestReducer = (item, sum) => (item.blogs > sum.blogs ? item : sum);

  return authorBlogs.length === 0 ? {} : authorBlogs.reduce(highestReducer, 0);
};

const mostLikes = (blogs) => {
  const authorLikes = blogs.map(
    (blog) =>
      new Object({
        author: blog.author,
        likes: blog.likes,
      })
  );
  const authorCounts = {};
  for (var i = 0; i < authorLikes.length; i++) {
    authorCounts[authorLikes[i].author] =
      authorLikes[i].likes + (authorCounts[authorLikes[i].author] || 0);
  }

  const objectAuthorLikes = Object.entries(authorCounts).map(
    (authorCount) =>
      new Object({
        author: authorCount[0],
        likes: authorCount[1],
      })
  );

  const highestReducer = (item, sum) => (item.likes > sum.likes ? item : sum);

  return objectAuthorLikes.length === 0
    ? {}
    : objectAuthorLikes.reduce(highestReducer, 0);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
