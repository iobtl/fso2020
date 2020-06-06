import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const authorResult = useQuery(ALL_AUTHORS);
  const bookResult = useQuery(ALL_BOOKS);
  console.log(authorResult);

  if (authorResult.loading || bookResult.loading) {
    return <div>loading...</div>;
  }

  const authors = authorResult.data.allAuthors;
  const books = bookResult.data.allBooks;

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors authors={authors} show={page === 'authors'} />

      <Books books={books} show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  );
};

export default App;
