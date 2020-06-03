// Action creators
export const sendNotification = (message) => {
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
    setTimeout(() => {
      dispatch({
        type: 'RESET',
      });
    }, time * 1000);
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
