import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Recommended = ({ books, show, user }) => {
  if (!show) {
    return null;
  }

  if (books.length === 0) {
    console.log('no books found');
    return <div>no books found</div>;
  }

  const favouriteGenre = user.favouriteGenre;

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favourite genre <strong>{favouriteGenre}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
