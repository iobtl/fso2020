import React from 'react';
import { useSelector } from 'react-redux';

const Users = () => {
  const blogs = useSelector((state) => state.blogs);
  const users = blogs.map((blog) => blog.user.name);
  let userCount = {};
  users.forEach((user) => {
    userCount[user] = userCount[user] + 1 || 1;
  });

  userCount = Object.entries(userCount);
  console.log(userCount);
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th />
            <th>blogs created</th>
          </tr>
          {userCount.map((userBlogCount) => (
            <tr>
              <td>{userBlogCount[0]}</td>
              <td>{userBlogCount[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
