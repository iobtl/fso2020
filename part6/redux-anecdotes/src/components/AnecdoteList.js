import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import {
  voteNotification,
  blankNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
    dispatch(
      voteNotification(anecdotes.find((anecdote) => anecdote.id === id).content)
    );
    setTimeout(() => {
      dispatch(blankNotification());
    }, 5000);
  };

  return (
    <div>
      {anecdotes
        .sort((first, second) => second.votes - first.votes)
        .filter((anecdote) => anecdote.content.toLowerCase().includes(filter))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
