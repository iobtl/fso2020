import React from 'react';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = (event) => {
    event.preventDefault();

    // Getting out input value
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    dispatch(createNewAnecdote(content));
  };

  return (
    <form onSubmit={createAnecdote}>
      <h2>create new</h2>
      <div>
        <input name='anecdote' />
      </div>
      <button type='submit'>create</button>
    </form>
  );
};

export default AnecdoteForm;
