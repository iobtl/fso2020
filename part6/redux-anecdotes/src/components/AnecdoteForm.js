import React from 'react';
import { connect } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const createAnecdote = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.createNewAnecdote(content);
    props.createNotification(content, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default connect(null, { createNewAnecdote, createNotification })(
  AnecdoteForm
);
