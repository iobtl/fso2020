import React, { useState } from 'react';

const Login = ({ login, show, setToken, redirect }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!show) {
    return null;
  }

  const loginUser = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
    redirect('authors');

    setUsername('');
    setPassword('');
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
