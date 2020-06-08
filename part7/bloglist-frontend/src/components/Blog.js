import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { commentBlogAction } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const SingleBlog = ({ blog, likeBlog }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  if (!blog) {
    return null;
  }

  const handleNewCommentInput = (event) => {
    setComment(event.target.value);
  };

  const postNewComment = (event) => {
    event.preventDefault();
    dispatch(commentBlogAction(blog.id, comment));

    setComment('');
  };

  const increaseLikes = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    likeBlog(blog.id, newBlog);
  };

  return (
    <div>
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
      <div>
        <h3>comments</h3>
        <Form onSubmit={postNewComment}>
          <Form.Control
            onChange={handleNewCommentInput}
            value={comment}
            type='text'
          />
          <Button type='submit' style={{ marginTop: 5 }} variant='primary'>
            add comment
          </Button>
        </Form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={blog.comments.indexOf(comment)}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Blog = ({ blog }) => {
  return (
    <div>
      <div className='blogDiv'>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  );
};

export default Blog;
