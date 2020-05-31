import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeInput } from '../reducers/filterReducer';
import { filterAnecdote } from '../reducers/anecdoteReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    console.log(event.target.value);
    dispatch(changeInput(event.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input name='filter' onChange={handleChange} />
    </div>
  );
};

export default Filter;
