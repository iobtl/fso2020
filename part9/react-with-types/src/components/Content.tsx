import React from 'react';

type ContentProps = {
  courseParts: { name: string; exerciseCount: number }[];
};

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((course) => (
        <p>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
