import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import CreateBlog from './CreateBlog';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';

test('<CreateBlog /> updates parent state and calls CreateNewBlog', () => {
  const createNewBlog = jest.fn();

  const component = render(<CreateBlog createNewBlog={createNewBlog} />);
  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  const newBlog = {
    title: 'How to git gud',
    author: 'Git Gud',
    url: 'http://gettinggood.com',
  };

  fireEvent.change(title, {
    target: { value: newBlog.title },
  });

  fireEvent.change(author, {
    target: { value: newBlog.author },
  });

  fireEvent.change(url, {
    target: { value: newBlog.url },
  });

  console.log(prettyDOM(form));

  expect(title.value).toBe(newBlog.title);
  expect(author.value).toBe(newBlog.author);
  expect(url.value).toBe(newBlog.url);

  fireEvent.submit(form);

  expect(createNewBlog.mock.calls).toHaveLength(1);
  expect(createNewBlog.mock.calls[0][0]).toEqual(newBlog);
});
