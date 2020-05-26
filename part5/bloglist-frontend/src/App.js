import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedblogUserJSON');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      console.log('user successfully logged in');
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      setUser(user);
      window.localStorage.setItem('loggedblogUserJSON', JSON.stringify(user));
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
    console.log('successfully logged out');
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
        <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
        </p>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
