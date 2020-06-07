import React from 'react';

const Recommended = ({ books, show, user }) => {
  if (!show) {
    return null;
  }

  const favouriteGenre = user.favouriteGenre;
  const filteredBooks = books.filter((book) =>
    book.genres.includes(favouriteGenre)
  );

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
          {filteredBooks.map((a) => (
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
