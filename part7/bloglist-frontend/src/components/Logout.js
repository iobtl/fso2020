import React from 'react';
import Button from 'react-bootstrap/Button';

const Logout = ({ name, logout }) => {
  return (
    <div>
      {name} logged in
      <Button
        variant='outline-secondary'
        data-cy='user-logout'
        style={{ marginLeft: 5 }}
        onClick={logout}
      >
        logout
      </Button>
    </div>
  );
};

export default Logout;
