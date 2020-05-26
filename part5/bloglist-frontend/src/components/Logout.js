import React from 'react';

const Logout = ({ name, logout }) => {
  return (
    <div>
      <p>
        {name} logged in
        <button onClick={logout}>logout</button>
      </p>
    </div>
  );
};

export default Logout;
