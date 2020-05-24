const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({});

  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get('/:id', async (request, response, next) => {
  const returnedBlog = await Blog.findById(request.params.id);

  response.status(200).json(returnedBlog);
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);

  await blog.save();
  response.status(200).json(blog.toJSON());
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
