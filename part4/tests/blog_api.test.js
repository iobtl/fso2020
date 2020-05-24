const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/Blog');
const blog_helper = require('../utils/blog_helper');

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of blog_helper.initialBlogs) {
    let newBlog = new Blog(blog);
    await newBlog.save();
  }
});

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
