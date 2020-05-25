const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

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

  response.status(200).json(returnedBlog);
});

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  if (!body.userId) {
    return response.status(400).json({ error: 'registered user not found' });
  }
  const user = await User.findById(body.userId);

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
  await Blog.findByIdAndRemove(request.params.id);
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
