const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });

  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get('/:id', async (request, response, next) => {
  const returnedBlog = await Blog.findById(request.params.id);

  response.status(200).json(returnedBlog.toJSON());
});

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(200).json(savedBlog.toJSON());
});

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body;
  console.log(body);

  const blog = await Blog.findById(request.params.id);
  console.log(blog);
  await blog.updateOne({
    comments: [...blog.comments, body.comment],
  });

  response.status(200).json({ message: 'comment added' });
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const blogToDelete = await Blog.findById(request.params.id);

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!(request.token || decodedToken.id)) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  // checking whether the user who created the blog is the same as the user
  // trying to delete the blog
  // originally, the token was signed using the username and userid
  const user = await User.findById(decodedToken.id);

  if (blogToDelete.user.toString() !== user._id.toString()) {
    return response.status(401).send({ error: 'unauthorized user' });
  }

  await Blog.remove(blogToDelete);
  response.status(204).json({ message: 'blog deleted' });
});

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body;
  const newBlog = {
    body,
    user: body.user.id,
  };

  const returnedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    newBlog,
    { new: true }
  ).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });

  response.status(200).json(newBlog);
});

module.exports = blogsRouter;
