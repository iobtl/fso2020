import anecdoteService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

// Action creators
export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  };
};

export const createNewAnecdote = (content) => {
  return {
    type: 'CREATE',
    data: {
      content: content,
      id: getId(),
      votes: 0,
    },
  };
};

export const initializeAnecdotes = (data) => {
  return {
    type: 'INIT_ANECDOTE',
    data: data,
  };
};

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'VOTE':
      const anecdoteToUpdate = state.find(
        (anecdote) => anecdote.id === action.data.id
      );
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      };

      return state.map((anecdote) =>
        anecdote.id !== action.data.id ? anecdote : updatedAnecdote
      );

    case 'CREATE':
      const newAnecdote = {
        content: action.data.content,
        id: getId(),
        votes: 0,
      };

      anecdoteService.create(newAnecdote);

      return [...state, newAnecdote];

    case 'INIT_ANECDOTE':
      return action.data;

    default:
      return state;
  }
};

export default anecdoteReducer;
