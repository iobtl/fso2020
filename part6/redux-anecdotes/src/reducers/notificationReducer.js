export const voteNotification = (content, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'UPVOTE',
      data: { content },
    });
    dispatch(blankNotification(timeout));
  };
};

export const createNotification = (content, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD',
      data: { content },
    });
    dispatch(blankNotification(timeout));
  };
};

export const blankNotification = (timeout) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: 'BLANK',
        timeout,
      });
    }, timeout * 1000);
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
