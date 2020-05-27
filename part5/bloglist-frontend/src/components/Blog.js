import React, { useState } from 'react';

const Blog = ({ blog, likeBlog }) => {
  const [view, setView] = useState(false);

  const toggleView = () => {
    setView(!view);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
  };

  const increaseLikes = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    likeBlog(blog.id, newBlog);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        {view === false ? (
          <inline>
            <button onClick={toggleView}>view</button>
          </inline>
        ) : (
          <inline>
            <button onClick={toggleView}>hide</button>
            <p>{blog.url}</p>
            <p>
              likes {blog.likes}
              <button onClick={increaseLikes}>like</button>
            </p>
            <p>{blog.user.name}</p>
          </inline>
        )}
      </div>
    </div>
  );
};

export default Blog;
