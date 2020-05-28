import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';

test('renders its children properly', () => {
  const blog = {
    title: 'How to get good',
    url: 'http://gettinggood.com',
    author: 'Git Gud',
  };

  let component = render(<Blog blog={blog} />);
  const blogDiv = component.container.querySelector('.blogDiv');

  expect(blogDiv).not.toHaveTextContent('likes');
  expect(blogDiv).not.toHaveTextContent(`${blog.url}`);
});

test('shows full details only after view button is clicked', () => {
  const blog = {
    title: 'How to get good',
    url: 'http://gettinggood.com',
    author: 'Git Gud',
    likes: 100,
    user: {
      username: 'bear',
      name: 'hehe',
      id: '58712381dcawd2138751',
    },
  };

  let component = render(<Blog blog={blog} />);
  const blogDiv = component.container.querySelector('.blogDiv');

  console.log(prettyDOM(blogDiv));
  const button = component.getByText('view');

  fireEvent.click(button);

  expect(blogDiv).toHaveTextContent('likes');
  expect(blogDiv).toHaveTextContent(`${blog.url}`);
});
