const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
  PubSub,
} = require('apollo-server');
const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const MONGODB_URI =
  'mongodb+srv://fullstack:tyetye0209@cluster0-yyqus.mongodb.net/graphql?retryWrites=true&w=majority';

const JWT_SECRET = 'HEHEXD';

console.log('connecting to MONGODB');
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MONGODB');
  })
  .catch((error) => console.log('error connecting to MONGODB', error.message));

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

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
    me: User!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate('author').exec();
      if (args.author) {
        // comparing ObjectId
        const author = await Author.findOne({ name: args.author });
        books = books.filter((book) => book.author.name === args.author);
      }

      if (args.genre) {
        books = books.filter((book) => book.genres.includes(args.genre));
      }

      /* Alternative: 
      const query = {}
      if (args.author) {
        const author = await Author.findOne({name: args.author})
        query.author = author.id
      }

      if (args.genre) {
        query.genres = {$in: [args.genre]}
      }

      return Book.find(query).populate('author')
      */

      return books;
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id });
      return books.length;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      let author = await Author.findOne({ name: args.author });
      if (!currentUser) {
        throw new AuthenticationError('user not logged in');
      }

      if (!author) {
        author = new Author({
          name: args.author,
        });

        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      let newBook = new Book({
        ...args,
        author: author._id,
      });

      try {
        await newBook.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      newBook = await newBook.populate('author').execPopulate();

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

      return newBook;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('user not logged in');
      }

      try {
        const author = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        );

        if (!author) {
          return null;
        }

        return author;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    createUser: async (root, args, { currentUser }) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });

      if (!currentUser) {
        throw new AuthenticationError('user not logged in');
      }

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secred') {
        throw new UserInputError('invalid username or password');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
