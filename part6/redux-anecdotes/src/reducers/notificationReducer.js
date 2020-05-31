export const voteNotification = (content) => {
  return {
    type: 'UPVOTE',
    data: { content },
  };
};

export const createNotification = (content) => {
  return {
    type: 'ADD',
    data: { content },
  };
};

export const blankNotification = () => {
  return {
    type: 'BLANK',
  };
};

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPVOTE':
      return `You voted ${action.data.content}`;
    case 'ADD':
      return `New anecdote added: ${action.data.content} `;
    case 'BLANK':
      return null;
    default:
      return state;
  }
};

export default notificationReducer;
