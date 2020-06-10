import React from 'react';
import { CoursePart } from '../index';

type ContentProps = {
  courseParts: CoursePart[];
};

type PartProps = {
  part: CoursePart;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<PartProps> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <div>
          {part.name} {part.exerciseCount} {part.description}
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          {part.name} {part.exerciseCount} {part.groupProjectCount}
        </div>
      );
    case 'Deeper type usage':
      return (
        <div>
          {part.name} {part.exerciseCount} {part.description}{' '}
          {part.exerciseSubmissionLink}
        </div>
      );
    case 'Learning refactoring':
      return (
        <div>
          {part.name} {part.exerciseCount} {part.description}{' '}
          {part.refactorCounts}
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};

export default Content;
