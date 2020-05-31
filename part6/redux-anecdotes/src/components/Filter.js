import React from 'react';
import { connect } from 'react-redux';
import { changeInput } from '../reducers/filterReducer';

const Filter = (props) => {
  const handleChange = (event) => {
    props.changeInput(event.target.value);
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

export default connect(null, { changeInput })(Filter);
