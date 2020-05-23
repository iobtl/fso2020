const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => next(error));
});

blogsRouter.get('/:id', (request, response, next) => {
  Blog.find(request.params.id)
    .then((blog) => {
      response.json(blog);
    })
    .catch((error) => next(error));
});

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((savedBlog) => {
      response.status(201).json(savedBlog);
    })
    .catch((error) => next(error));
});

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

blogsRouter.put('/:id', (request, response, next) => {
  Blog.findByIdAndUpdate(request.params.id)
    .then((updatedObject) => {
      response.json(updatedObject);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;