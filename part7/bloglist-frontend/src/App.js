import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Blog from './components/Blog';
import Login from './components/Login';
import Logout from './components/Logout';
import CreateBlog from './components/CreateBlog';
import Togglable from './components/Togglable';
import { sendNotification } from './components/notificationReducer';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

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

      dispatch(
        sendNotification(`user ${user.name} has successfully logged in`)
      );
    }
  }, []);

  // Helper function to remove notification after 5 seconds

  // Handling user login page
  const handleLogin = async (newUser) => {
    try {
      // Creating HTTP POST request to login page
      const user = await loginService.login(newUser);

      // Registering user information in browser session and blog service
      // From this point on, server only identify user by token
      setUser(user);
      window.localStorage.setItem('loggedblogUserJSON', JSON.stringify(user));

      // Notification alerts
      dispatch(
        sendNotification(`user ${user.name} has successfully logged in`)
      );
    } catch (exception) {
      dispatch(sendNotification('invalid username or password'));
      setIsError(true);
    }
  };

  // Handling logout of user
  const handleLogout = async () => {
    window.localStorage.clear();
    setUser(null);
    blogService.setToken(null);

    dispatch(sendNotification('successfully logged out'));
  };

  // Handling creation of new blog
  const createNewBlog = async (newBlog) => {
    const savedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(savedBlog));
    dispatch(
      sendNotification(
        `a new blog, ${savedBlog.title} by ${savedBlog.author} added`
      )
    );
  };

  // Logic for changing likes of blogs
  const likeBlog = async (id, newBlog) => {
    const updatedBlog = await blogService.update(id, newBlog);
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : newBlog)));

    const message = `the blog ${updatedBlog.title} has been updated`;
    dispatch(sendNotification(message));
  };

  // Handling deletion of a blog
  const deleteBlog = async (id) => {
    const confirmation = window.confirm(
      `Remove the blog ${JSON.stringify(
        blogs.find((blog) => blog.id === id).title
      )}?`
    );
    if (confirmation) {
      await blogService.remove(id);
      const deletedBlog = blogs.find((blog) => blog.id === id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      dispatch(
        sendNotification(
          `the blog ${deletedBlog.title} by ${deletedBlog.author} has been deleted`
        )
      );
    }
  };

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification isError={isError} />
        {user === null ? (
          <Togglable buttonLabel='log in'>
            <Login handleLogin={handleLogin} />
          </Togglable>
        ) : (
          <div>
            <inline>
              <Logout name={user.name} logout={handleLogout} />
            </inline>
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
        )}
      </div>
    </div>
  );
};

export default App;
