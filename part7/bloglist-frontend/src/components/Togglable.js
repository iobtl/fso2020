import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  // If visible, means the note creation form can be seen
  const toggleVisible = () => {
    setVisible(!visible);
  };

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  return (
    <div>
      {visible === false ? (
        <div>
          <button onClick={toggleVisible}>{props.buttonLabel}</button>
        </div>
      ) : (
        <div>
          {props.children}
          <button onClick={toggleVisible}>cancel</button>
        </div>
      )}
    </div>
  );
};

export default Togglable;
