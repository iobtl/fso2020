import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const Login = ({ show, setToken, redirect }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN);

  if (!show) {
    return null;
  }

  const loginUser = async (event) => {
    event.preventDefault();

    const token = login({ variables: { username, password } });
    setToken(token.value);
    redirect('authors');
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <div>
          name{' '}
          <input
            type='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default Login;
