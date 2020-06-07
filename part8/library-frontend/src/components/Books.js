import React, { useState } from 'react';

const Books = ({ books, show }) => {
  const [genreFilter, setGenreFilter] = useState(null);
  if (!show) {
    return null;
  }

  const bookGenres = books.map((book) => book.genres).flat();
  const uniqueGenres = [...new Set(bookGenres)];

  // Applying filter logic
  const filteredBooks = genreFilter
    ? books.filter((book) => book.genres.includes(genreFilter))
    : books;

  return (
    <div>
      <h2>books</h2>
      {genreFilter === null ? null : (
        <div>
          in genre <strong>{genreFilter}</strong>
        </div>
      )}
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
      <div>
        {uniqueGenres.map((genre) => (
          <button onClick={() => setGenreFilter(genre)}>{genre}</button>
        ))}
        <button onClick={() => setGenreFilter(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
