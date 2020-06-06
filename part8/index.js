const { ApolloServer, gql } = require('apollo-server');
const { v1: uuid } = require('uuid');
const Book = require('./models/Book');
const Author = require('./models/Author');
const mongoose = require('mongoose');

const MONGODB_URI =
  'mongodb+srv://fullstack:tyetye0209@cluster0-yyqus.mongodb.net/graphql?retryWrites=true&w=majority';

console.log('connecting to MONGODB');
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MONGODB');
  })
  .catch((error) => console.log('error connecting to MONGODB', error.message));

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
];

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String
    born: Int
    bookCount: Int
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      const filteredAuthors = args.author
        ? Book.find({ author: args.author })
        : Book.find({});
      const filteredGenres = args.genre
        ? filteredAuthors.find({ genres: { $in: [args.genre] } })
        : filteredAuthors.find({});

      return filteredGenres;
    },
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    bookCount: async (root) =>
      await Book.find({ author: root.name }).countDocuments(),
  },
  Mutation: {
    addBook: async (root, args) => {
      if (!Author.find({ name: args.author })) {
        console.log('author not found');
        const author = new Author({
          name: args.author,
        });
        await author.save();
      } else {
        const author = await Author.find({ name: args.author });
      }

      const newBook = new Book({
        ...args,
        author: author._id,
      });

      await newBook.save();

      return newBook;
    },
    editAuthor: async (root, args) => {
      const author = Author.findOne({ name: args.name });

      if (author === null) {
        return null;
      }

      const updatedAuthor = {
        ...author,
        born: args.setBornTo,
      };

      await updatedAuthor.save();

      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
