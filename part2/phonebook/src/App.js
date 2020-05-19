import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  const handleNewName = (event) => {
    // Changes controlled state of the input values on each change
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleNewFilter = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
    const filteredNames = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value)
    );
    setPersons(filteredNames);
    // Accounting for when the filter field is blank (after inputting some value)
    if (event.target.value === "") {
      personService.getAll().then((allPeople) => {
        setPersons(allPeople);
      });
    }
  };

  const handleNewPerson = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);
    if (names.includes(newName) === true) {
      const confirmation = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmation === true) {
        const personToChange = persons.find(
          (person) => person.name === newName
        );
        const changedPerson = { ...personToChange, number: newNumber };
        // Need to update both the database and the current state
        personService
          .update(changedPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.name !== personToChange.name ? person : returnedPerson
              )
            );
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService.create(newPerson).then((returnedPerson) => {
        // Updating state in App component
        // Without this line, the front-end state will not be updated with this POST request
        setPersons(persons.concat(returnedPerson));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const removePerson = (id) => {
    const personToRemove = persons.find((person) => person.id === id);
    const confirmation = window.confirm(`Delete ${personToRemove.name} ?`);
    if (confirmation === true) {
      const newPersons = persons.filter((person) => person.id !== id);
      setPersons(newPersons);
      personService.remove(id);
      console.log("person removed from database");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleNewFilter={handleNewFilter} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        handleNewPerson={handleNewPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} remove={removePerson} />
    </div>
  );
};

export default App;
