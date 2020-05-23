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
  const authorCounts = {};
  for (var i = 0; i < blogs.length; i++) {
    authorCounts[blogs[i].author] = 1 + (authorCounts[blogs[i].author] || 0);
  }
  console.log(authorCounts);

  const authorBlogs = Object.entries(authorCounts).map(
    (authorCount) =>
      new Object({
        author: authorCount[0],
        blogs: authorCount[1],
      })
  );

  const highestReducer = (item, sum) => (item.blogs > sum.blogs ? item : sum);

  return authorBlogs.length === 0 ? {} : authorBlogs.reduce(highestReducer, 0);
};

const mostLikes = (blogs) => {
  const authorCounts = {};
  for (var i = 0; i < blogs.length; i++) {
    authorCounts[blogs[i].author] =
      blogs[i].likes + (authorCounts[blogs[i].author] || 0);
  }
  console.log(authorCounts);

  const authorLikes = Object.entries(authorCounts).map(
    (authorCount) =>
      new Object({
        author: authorCount[0],
        likes: authorCount[1],
      })
  );

  console.log(authorLikes);

  const highestreducer = (item, sum) => (item.likes > sum.likes ? item : sum);

  return authorLikes.length === 0 ? {} : authorLikes.reduce(highestreducer, 0);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
