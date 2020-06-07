import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query obtainBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation changeAuthorBorn($name: String!, $birthyear: Int!) {
    editAuthor(name: $name, setBornTo: $birthyear) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const CURRENT_USER = gql`
  query {
    me {
      username
      favouriteGenre
    }
  }
`;
