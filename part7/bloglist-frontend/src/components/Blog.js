import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const SingleBlog = ({ blog, likeBlog }) => {
  if (!blog) {
    return null;
  }

  const increaseLikes = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    likeBlog(blog.id, newBlog);
  };

  return (
    <div>
      <h2 style={{ display: 'inline', paddingRight: 5 }}>{blog.title}</h2>
      <Link to='/'>back</Link>
      <p>{blog.url}</p>
      <p data-cy='blog-likes'>
        likes {blog.likes}
        <button data-cy='blog-likes-button' onClick={increaseLikes}>
          like
        </button>
      </p>
      <p>{blog.user.name}</p>
    </div>
  );
};

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div className='blogDiv'>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  );
};

export default Blog;
