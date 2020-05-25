const mongoose = require('mongoose');
const supertest = require('supertest');
require('express-async-errors');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/Blog');
const User = require('../models/User');
const blog_helper = require('../utils/blog_helper');
const bcrypt = require('bcrypt');

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const randomPassword = 'bnaiowdaw';

  const hashedPassword = await bcrypt.hash(randomPassword, 10);

  const newUser = new User({
    username: 'root',
    name: 'bear',
    passwordHash: hashedPassword,
  });

  await newUser.save();

  for (let blog of blog_helper.initialBlogs) {
    let newBlog = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: newUser._id,
    })
    await newBlog.save();
  }
});

describe('on the blog page', async () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs have an id property', async () => {
    const blogs = await Blog.find({});
    const blogsId = blogs.map((blog) => blog.toJSON().id);

    for (let blogId of blogsId) {
      expect(blogId).toBeDefined();
    }
  });

  test('a specific blog can be accessed by id', async () => {
    // Blog in question:
    const initialBlogs = await blog_helper.blogsInDb();
    const blogId = initialBlogs[0].id;
    const returnedBlog = await api
      .get(`/api/blogs/${blogId}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('a valid blog can be added', async () => {
    // picking a random userid from the database
    const currentUsers = await blog_helper.usersInDb();
    const newBlog = {
      title: 'Async/Await',
      author: 'Bear',
      url: 'http://asyncawaitatbear.com',
      likes: 0,
      userId: currentUsers[0].id,
    };

    const user = {
      username: 'root',
      name: 'bear',
      password: 'bnaiowdaw',
    };

    const returnedUser = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${returnedUser.body.token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const allBlogs = await blog_helper.blogsInDb();
    expect(allBlogs).toHaveLength(blog_helper.initialBlogs.length + 1);

    const blogTitles = allBlogs.map((blog) => blog.title);
    expect(blogTitles).toContain('Async/Await');
  });

  test('default value of likes for new blogs, if unspecified, is 0', async () => {
    const newBlog = new Blog({
      title: 'Async/Await',
      author: 'Bear',
      url: 'http://asyncawaitatbear.com',
    });

    await newBlog.save();
    const savedBlog = await Blog.find({ title: 'Async/Await' });
    const blogJSON = savedBlog.map((blog) => blog.toJSON());
    expect(blogJSON[0].likes).toBe(0);
  });

  test('blog with missing fields cannot be created, even when web token provided', async () => {
    const newBlog = {
      author: 'Bear',
    };

    const user = {
      username: 'root',
      name: 'bear',
      password: 'bnaiowdaw',
    };

    const returnedUser = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${returnedUser.body.token}`)
      .send(newBlog)
      .expect(400);
  });

  test('a blog can be deleted', async () => {
    const initialBlogs = await blog_helper.blogsInDb();

    const blogToDelete = initialBlogs[0];

    const user = {
      username: 'root',
      name: 'bear',
      password: 'bnaiowdaw',
    };

    const returnedUser = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${returnedUser.body.token}`)
      .expect(204);

    const newBlogs = await blog_helper.blogsInDb();

    // Length of blogs array
    expect(newBlogs).toHaveLength(initialBlogs.length - 1);
    // content of blogToDelete is not there
    expect(newBlogs).not.toContain(blogToDelete);
  });

  test('a specified blog can be updated', async () => {
    const initialBlogs = await blog_helper.blogsInDb();

    const blogToUpdate = initialBlogs[0];
    const newBlog = { ...blogToUpdate, likes: 10 };

    const returnedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(returnedBlog.body.title).toContain('React patterns');
    expect(returnedBlog.body).not.toEqual(blogToUpdate);
  });
});

describe('on the user page', async () => {
  test('the list of users can be obtained', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('a new user can be created', async () => {
    const initialUsers = await blog_helper.usersInDb();

    const newUser = {
      username: 'Hellothere',
      name: 'hehe',
      password: 'daoiwdnawod',
    };

    const returnedUser = await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const allUsers = await blog_helper.usersInDb();
    console.log(allUsers);
    expect(allUsers).toHaveLength(initialUsers.length + 1);

    const allUsernames = allUsers.map((user) => user.username);
    expect(allUsernames).toContain(newUser.username);
  });

  test('user is not added when minimum password or username length is not met', async () => {
    const initialUsers = await blog_helper.usersInDb();

    const wrongUser = {
      username: 'he',
      name: 'hehe',
      password: 'hiya',
    };

    const wrongPassword = {
      username: 'hedawd',
      name: 'hehe',
      password: 'hi',
    };

    await api.post('/api/users').send(wrongUser).expect(400);
    await api.post('/api/users').send(wrongPassword).expect(400);

    const currentUsers = await blog_helper.usersInDb();
    expect(currentUsers).toHaveLength(initialUsers.length);
    const currentUsernames = currentUsers.map((user) => user.username);
    expect(currentUsernames).not.toContain(wrongUser.username);
  });

  test('adding a blog registered to a userid displays the blogs on the users page as well', async () => {
    const initialUser = await blog_helper.usersInDb();

    const newBlog = {
      title: 'How to build a bear',
      url: 'http://buildingbear.com',
      author: 'Bear',
      likes: 100,
      userId: initialUser[0].id,
    };

    const user = {
      username: 'root',
      name: 'bear',
      password: 'bnaiowdaw',
    };

    const returnedUser = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${returnedUser.body.token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const currentUsers = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(currentUsers.body[0].blogs).toHaveLength(
      initialUser[0].blogs.length + 1
    );
    const blog = currentUsers.body[0].blogs[0];
    expect(blog.title).toEqual('How to build a bear');
  });

  test('able to obtain json web token when logging in', async () => {
    const user = {
      username: 'root',
      name: 'bear',
      password: 'bnaiowdaw',
    };

    const returnedUser = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(returnedUser.body.token).toBeDefined();
  });

  test('unable to post blog if no authorization header provided', async () => {
    const initialUser = await blog_helper.usersInDb();

    const newBlog = {
      title: 'How to build a bear',
      url: 'http://buildingbear.com',
      author: 'Bear',
      likes: 100,
      userId: initialUser[0].id,
    };

    await api.post('/api/blogs').send(newBlog).expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
