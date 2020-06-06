import React, { useState } from 'react';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';
import { useMutation } from '@apollo/client';

const Authors = ({ authors, show }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [editAuthorBirth] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    const birthyear = parseInt(born);
    editAuthorBirth({ variables: { name, birthyear } });

    setName('');
    setBorn('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>set birthyear</h3>
        <form onSubmit={submit}>
          <div>
            name{' '}
            <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
