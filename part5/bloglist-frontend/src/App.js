import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Blog from './components/Blog';
import Login from './components/Login';
import Logout from './components/Logout';
import CreateBlog from './components/CreateBlog';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  // Re-rendering blogs since 'populate' only called on first load of page
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [blogs.length]);

  // Retrieving existing user information in browser session, if any
  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedblogUserJSON');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);

      setMessage(`user ${user.name} has successfully logged in`);
      resetMessage();
    }
  }, []);

  // Helper function to remove notification after 5 seconds
  const resetMessage = () => {
    setTimeout(() => {
      setMessage(null);
      setIsError(false);
    }, 5000);
  };

  // Handling user login page
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Creating HTTP POST request to login page
      const user = await loginService.create({ username, password });

      // Registering user information in browser session and blog service
      // From this point on, server only identify user by token
      setUser(user);
      window.localStorage.setItem('loggedblogUserJSON', JSON.stringify(user));

      // Notification alerts
      setMessage(`user ${user.name} has successfully logged in`);
      resetMessage();
    } catch (exception) {
      setMessage('invalid username or password');
      setIsError(true);

      resetMessage();
    }

    // Resetting username and password fields
    setUsername('');
    setPassword('');
  };

  // Handling logout of user
  const handleLogout = async () => {
    window.localStorage.clear();
    setUser(null);
    blogService.setToken(null);

    setMessage('successfully logged out');
    resetMessage();
  };

  // Handling creation of new blog
  const createNewBlog = async (newBlog) => {
    const savedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(savedBlog));
    setMessage(`a new blog, ${savedBlog.title} by ${savedBlog.author} added`);
    resetMessage();
  };

  // Logic for changing likes of blogs
  const likeBlog = async (id, newBlog) => {
    const updatedBlog = await blogService.update(id, newBlog);
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : newBlog)));
    setMessage(
      `blog ${updatedBlog.title} by ${updatedBlog.author} has been updated`
    );

    resetMessage();
  };

  // Handling deletion of a blog
  const deleteBlog = async (id) => {
    await blogService.remove(id);
    const deletedBlog = blogs.find((blog) => blog.id === id);
    setBlogs(blogs.filter((blog) => blog.id !== id));
    setMessage(
      `the blog ${deletedBlog.title} by ${deletedBlog.author} has been deleted`
    );

    resetMessage();
  };

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification message={message} isError={isError} />
        {user === null ? (
          <Togglable buttonLabel='log in'>
            <Login
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
          </Togglable>
        ) : (
          <Logout name={user.name} logout={handleLogout} />
        )}
        <h2>create new</h2>
        <Togglable buttonLabel='create new blog'>
          <CreateBlog createNewBlog={createNewBlog} />
        </Togglable>
        {blogs
          .sort((first, second) => second.likes - first.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
