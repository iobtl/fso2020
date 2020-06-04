import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CreateBlog = ({ createNewBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const createBlog = (event) => {
    event.preventDefault();
    createNewBlog(newBlog);

    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <Form onSubmit={createBlog}>
      <Form.Row>
        <Form.Group controlId='formUsername'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='title'
            value={newBlog.title}
            onChange={({ target }) =>
              setNewBlog({
                ...newBlog,
                title: target.value,
              })
            }
            placeholder='Title of new blog'
          />
        </Form.Group>
        <Form.Group style={{ marginLeft: 5 }}>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type='author'
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({
                ...newBlog,
                author: target.value,
              })
            }
            placeholder='Author of new blog'
          />
        </Form.Group>
      </Form.Row>
      <Form.Group>
        <Form.Label>URL</Form.Label>
        <Form.Control
          type='url'
          value={newBlog.url}
          onChange={({ target }) =>
            setNewBlog({
              ...newBlog,
              url: target.value,
            })
          }
          placeholder='URL of new blog'
        />
      </Form.Group>
      <Button
        variant='outline-primary'
        data-cy='createblog-submit'
        type='submit'
      >
        create
      </Button>
    </Form>
  );
};

export default CreateBlog;
