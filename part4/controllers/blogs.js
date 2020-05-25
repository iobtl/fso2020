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

  if (!body.userId) {
    return response.status(400).json({ error: 'registered user not found' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(200).json(savedBlog.toJSON());
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
    response.status(401).send({ error: 'unauthorized user' });
  }

  await Blog.remove(blogToDelete);
  response.status(204).send({ message: 'Blog deleted' });
});

blogsRouter.put('/:id', async (request, response, next) => {
  const newBlog = {
    ...request.body,
  };

  const returnedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    newBlog,
    { new: true }
  );
  response.status(200).json(returnedBlog);
});

module.exports = blogsRouter;
