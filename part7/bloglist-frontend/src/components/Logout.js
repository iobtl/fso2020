import React from 'react';

const Logout = ({ name, logout }) => {
  return (
    <div>
      <p>
        {name} logged in
        <button data-cy='user-logout' onClick={logout}>logout</button>
      </p>
    </div>
  );
};

export default Logout;
