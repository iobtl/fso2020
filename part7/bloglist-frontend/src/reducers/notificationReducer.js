// Action creators
const timeouts = [];

export const sendNotification = (message) => {
  timeouts.forEach((id) => window.clearTimeout(id));
  return (dispatch) => {
    dispatch({
      type: 'MESSAGE',
      data: message,
    });
    dispatch(resetNotification(5));
  };
};

export const resetNotification = (time) => {
  return (dispatch) => {
    const id = setTimeout(() => {
      dispatch({
        type: 'RESET',
      });
    }, time * 1000);
    timeouts.push(id);
  };
};

const notificationReducer = (state = null, action) => {
  console.log(action);
  switch (action.type) {
    case 'MESSAGE':
      return action.data;
    case 'RESET':
      return null;
    default:
      return state;
  }
};

export default notificationReducer;
