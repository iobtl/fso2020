import React from 'react';

const Logout = ({ name, logout }) => {
  const leftPadding = {
    paddingLeft: 5,
  };

  return (
    <div style={{ display: 'inline', ...leftPadding }}>
      {name} logged in
      <button data-cy='user-logout' style={leftPadding} onClick={logout}>
        logout
      </button>
    </div>
  );
};

export default Logout;
