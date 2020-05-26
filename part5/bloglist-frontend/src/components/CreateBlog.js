import React from 'react';

const CreateBlog = ({ newBlog, setNewBlog, createNewBlog }) => {
  return (
    <form onSubmit={createNewBlog}>
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
