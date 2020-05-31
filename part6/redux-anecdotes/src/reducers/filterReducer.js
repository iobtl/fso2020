export const changeInput = (value) => {
  return {
    type: 'INPUT',
    value: value,
  };
};

const filterReducer = (state = '', action) => {
  if (action.type === 'INPUT') {
    return action.value;
  }

  return state;
};

export default filterReducer;
