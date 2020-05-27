import React, { useState } from 'react';

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
    <form onSubmit={createBlog}>
      <div>
        title:
        <input
          value={newBlog.title}
          text='blogTitle'
          onChange={({ target }) =>
            setNewBlog({
              ...newBlog,
              title: target.value,
            })
          }
        />
      </div>
      <div>
        author:
        <input
          value={newBlog.author}
          text='blogAuthor'
          onChange={({ target }) =>
            setNewBlog({
              ...newBlog,
              author: target.value,
            })
          }
        />
      </div>
      <div>
        url:
        <input
          value={newBlog.url}
          text='blogUrl'
          onChange={({ target }) =>
            setNewBlog({
              ...newBlog,
              url: target.value,
            })
          }
        />
      </div>
      <button type='submit'>create</button>
    </form>
  );
};

export default CreateBlog;
