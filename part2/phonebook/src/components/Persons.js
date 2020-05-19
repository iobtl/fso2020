import React from "react";

const Persons = ({ persons, removePerson }) => {
  // *** remove represents the function removePerson
  return (
    <div>
      {persons.map((person) => (
        <p key={persons.indexOf(person)}>
          {person.name} {person.number}{" "}
          <button onClick={() => removePerson(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
