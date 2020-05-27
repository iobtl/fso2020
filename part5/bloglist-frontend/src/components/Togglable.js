import React, { useState } from 'react';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  // If visible, means the note creation form can be seen
  const toggleVisible = () => {
    setVisible(!visible);
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
