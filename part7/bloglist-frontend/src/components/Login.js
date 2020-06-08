import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = (event) => {
    event.preventDefault();

    const newUser = {
      username: username,
      password: password,
    };

    handleLogin(newUser);

    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>log in to application</h2>
      <form data-cy='login-form' onSubmit={loginUser}>
        <div>
          username
          <input
            data-cy='login-username'
            value={username}
            text='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-cy='login-password'
            value={password}
            text='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant='outline-primary' data-cy='login-button' type='submit'>
          login
        </Button>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
