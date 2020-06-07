import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recommended from './components/Recommended';
import {
  useQuery,
  useApolloClient,
  useMutation,
  useLazyQuery,
} from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, LOGIN, CURRENT_USER } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [user, setUser] = useState(null);

  const [getRecommended, results] = useLazyQuery(ALL_BOOKS);

  const authorResult = useQuery(ALL_AUTHORS);
  const bookResult = useQuery(ALL_BOOKS);
  /*
  const userResult = useQuery(CURRENT_USER, {
    pollInterval: 500,
  });
  */

  const [getUser, userResult] = useLazyQuery(CURRENT_USER);

  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      getUser();
      localStorage.setItem('currentBlogUser', token);
    }
  }, [result.data]);

  useEffect(() => {
    if (results.data) {
      setRecommended(results.data.allBooks);
    }
  }, [results.data]);

  useEffect(() => {
    if (userResult.data) {
      setUser(userResult.data.me);
    }
  }, [userResult.data]);

  const client = useApolloClient();

  const getUserRecommended = () => {
    getRecommended({ variables: { genre: 'refactoring' } });
  };

  if (authorResult.loading || bookResult.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    console.log('logging out');
    setToken(null);
    setUser(null);
    localStorage.clear();
    client.clearStore();
    setPage('authors');
  };

  const authors = authorResult.data.allAuthors;
  const books = bookResult.data.allBooks;

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token === null ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <inline>
            <button onClick={() => setPage('add')}>add book</button>
            <button
              onClick={() => {
                setPage('recommended');
                getUserRecommended();
              }}
            >
              recommend
            </button>
            <button onClick={logout}>logout</button>
          </inline>
        )}
      </div>
      <Authors authors={authors} show={page === 'authors'} />
      <Books books={books} show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommended
        user={user}
        books={recommended}
        show={page === 'recommended'}
      />

      <Login
        login={login}
        show={page === 'login'}
        setToken={setToken}
        redirect={setPage}
      />
    </div>
  );
};

export default App;
