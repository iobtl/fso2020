import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input
            value={props.username}
            text='username'
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={props.password}
            text='password'
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default Login;
