import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { voteNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes;
  const filter = props.filter;

  const vote = (id) => {
    props.voteAnecdote(id);
    props.voteNotification(
      anecdotes.find((anecdote) => anecdote.id === id).content,
      5
    );
  };

  return (
    <div>
      {anecdotes
        .sort((first, second) => second.votes - first.votes)
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const connectedAnecdoteList = connect(mapStateToProps, {
  voteAnecdote,
  voteNotification,
})(AnecdoteList);

export default connectedAnecdoteList;
