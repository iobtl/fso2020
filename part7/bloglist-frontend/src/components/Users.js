import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

export const User = ({ user, blogs }) => {
  if (!user) {
    return null;
  }

  console.log(blogs);
  return (
    <div>
      <h2>{user.user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

const Users = () => {
  const blogs = useSelector((state) => state.blogs);
  const users = blogs.map((blog) => blog.user);
  let userCount = {};
  users.forEach((user) => {
    userCount[user.name] = userCount[user.name] + 1 || 1;
  });

  userCount = Object.entries(userCount);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>blogs created</th>
          </tr>
          {userCount.map((userBlogCount) => {
            const userId = users.find((user) => user.name === userBlogCount[0])
              .id;

            return (
              <tr>
                <Link to={`/users/${userId}`}>
                  <td key={userId}>{userBlogCount[0]}</td>
                </Link>
                <td>{userBlogCount[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
