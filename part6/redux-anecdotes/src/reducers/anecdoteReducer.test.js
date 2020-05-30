import anecdoteReducer from './anecdoteReducer';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

describe('on the anecdotes page', () => {
  test('increases votes with VOTE action', () => {
    const state = anecdotesAtStart.map((anecdote) => asObject(anecdote));
    const action = {
      type: 'VOTE',
      data: {
        id: state[0].id,
      },
    };

    const newState = anecdoteReducer(state, action);
    expect(newState[0].votes).toBe(1);
  });

  test('creates a new blog with CREATE action', () => {
    const state = anecdotesAtStart.map((anecdote) => asObject(anecdote));
    const action = {
      type: 'CREATE',
      data: {
        content: 'If you want to git gud, you need to feel gud',
      },
    };

    const newState = anecdoteReducer(state, action);
    const newStateContents = newState.map((objects) => objects.content);
    expect(newStateContents).toContain(
      'If you want to git gud, you need to feel gud'
    );
  });
});
