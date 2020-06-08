import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

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
          <Button variant='outline-primary' onClick={toggleVisible}>
            {props.buttonLabel}
          </Button>
        </div>
      ) : (
        <div>
          {props.children}
          <Button variant='outline-primary' onClick={toggleVisible}>
            cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default Togglable;
