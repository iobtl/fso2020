import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';

import { BrowserRouter as Router } from 'react-router-dom';
const reducers = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
