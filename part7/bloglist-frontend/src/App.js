import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Blog from './components/Blog';
import Login from './components/Login';
import Logout from './components/Logout';
import CreateBlog from './components/CreateBlog';
import Togglable from './components/Togglable';
import Users from './components/Users';

import { sendNotification } from './reducers/notificationReducer';
import { useSelector, useDispatch } from 'react-redux';

import {
  initializeBlogs,
  createNewBlogAction,
  likeBlogAction,
  removeBlogAction,
} from './reducers/blogReducer';

import { User } from './components/Users';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

const App = () => {
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);

  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  // Re-rendering blogs since 'populate' only called on first load of page
  useEffect(() => {
    dispatch(initializeBlogs());
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
    dispatch(createNewBlogAction(newBlog));
    dispatch(
      sendNotification(
        `a new blog, ${newBlog.title} by ${newBlog.author} added`
      )
    );
  };

  // Logic for changing likes of blogs
  const likeBlog = async (id, newBlog) => {
    dispatch(likeBlogAction(id, newBlog));

    const message = `the blog ${newBlog.title} has been updated`;
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
      const deletedBlog = blogs.find((blog) => blog.id === id);
      try {
        dispatch(removeBlogAction(id));
        dispatch(
          sendNotification(
            `the blog ${deletedBlog.title} by ${deletedBlog.author} has been deleted`
          )
        );
      } catch (err) {
        dispatch(sendNotification('user unauthorized'));
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 5000);
      }
    }
  };

  const match = useRouteMatch('/users/:id');
  // Finding the user which matches the id parameter in the URL
  const blogUser = match
    ? blogs.find((blog) => blog.user.id === match.params.id)
    : null;

  // Finding all the blogs which the particular found user has posted
  const userBlogs = blogUser
    ? blogs.filter((blog) => blog.user.id === blogUser.user.id)
    : null;

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
          </div>
        )}
      </div>

      <Switch>
        <Route path='/users/:id'>
          <User user={blogUser} blogs={userBlogs} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
