import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} parts={part} />
      ))}
    </div>
  );
};

const Part = ({ parts }) => {
  return (
    <div>
      <p>
        {parts.name} {parts.exercises}
      </p>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Total = ({ parts }) => {
  const exercises = parts.map((part) => part.exercises);
  return (
    <div>
      <b>
        <p>total of {exercises.reduce((a, b) => a + b, 0)} exercises</p>
      </b>
    </div>
  );
};

export default Course

