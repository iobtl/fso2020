import React from 'react'

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={persons.indexOf(person)}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons