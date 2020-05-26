import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedblogUserJSON');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
      console.log('user successfully logged in');
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      setUser(user);
      window.localStorage.setItem('loggedblogUserJSON', JSON.stringify(user));
      blogService.setToken(user.token);
      console.log('user sucessfully logged in');
    } catch (exception) {
      console.log('invalid credentials');
    }
    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    blogService.setToken(null);
    console.log('successfully logged out');
  };

  const createNewBlog = async (event) => {
    event.preventDefault();
    console.log(newBlog);
    const savedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(savedBlog));
    console.log('new blog successfully created');

    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              value={username}
              text='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              value={password}
              text='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification message={message} isError={isError} />
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        <h2>create new</h2>
        <form onSubmit={createNewBlog}>
          <div>
            title:
            <input
              value={newBlog.title}
              text='blogTitle'
              onChange={({ target }) =>
                setNewBlog({
                  ...newBlog,
                  title: target.value,
                })
              }
            />
          </div>
          <div>
            author:
            <input
              value={newBlog.author}
              text='blogAuthor'
              onChange={({ target }) =>
                setNewBlog({
                  ...newBlog,
                  author: target.value,
                })
              }
            />
          </div>
          <div>
            url:
            <input
              value={newBlog.url}
              text='blogUrl'
              onChange={({ target }) =>
                setNewBlog({
                  ...newBlog,
                  url: target.value,
                })
              }
            />
          </div>
          <button type='submit'>create</button>
        </form>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
