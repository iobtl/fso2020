import React from 'react';

type TotalProps = {
  courseParts: { name: string; exerciseCount: number }[];
};

const Total: React.FC<TotalProps> = ({ courseParts }) => {
  return (
    <div>
      Number of exercises{' '}
      {courseParts.reduce((first, second) => first + second.exerciseCount, 0)}
    </div>
  );
};

export default Total;
