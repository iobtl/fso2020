import React, { useState } from 'react';

const Blog = ({ blog, likeBlog, deleteBlog }) => {
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

  const removeBlog = () => {
    const blogId = blog.id;
    deleteBlog(blogId);
  };

  return (
    <div style={blogStyle}>
      <div className='blogDiv'>
        {blog.title} {blog.author}
        {view === false ? (
          <inline>
            <button data-cy='blog-view' onClick={toggleView}>
              view
            </button>
          </inline>
        ) : (
          <inline>
            <button data-cy='blog-view' onClick={toggleView}>
              hide
            </button>
            <p>{blog.url}</p>
            <p data-cy='blog-likes'>
              likes {blog.likes}
              <button data-cy='blog-likes-button' onClick={increaseLikes}>
                like
              </button>
            </p>
            <p>{blog.user.name}</p>
            <p>
              <button data-cy='blog-remove' onClick={removeBlog}>
                remove
              </button>
            </p>
          </inline>
        )}
      </div>
    </div>
  );
};

export default Blog;
