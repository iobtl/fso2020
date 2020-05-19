import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personService from "./services/person";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  // Event handler for changes in input values for 'name'
  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  // Event handler for changes in input values for 'number'
  const handleNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  // Event handler for changes in input values for 'filter'
  const handleNewFilter = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
    const filteredNames = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setPersons(filteredNames);
    // Accounting for when the filter field is blank (after inputting some value)
    if (event.target.value === "") {
      personService.getAll().then((allPeople) => {
        setPersons(allPeople);
      });
    }
  };

  // Event handler for adding a person to the existing database/numbers record
  const handleNewPerson = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);
    // Case 1: Person already exists in database/records
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
          })
          .catch((error) => {
            setMessage(
              `Information of ${newName} has already been removed from server`
            );
            setIsError(true)
            setTimeout(() => {
              setMessage(null);
              setIsError(false)
            }, 5000);
          });

        setMessage(`Changed number of ${changedPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
      // Case 2: Person does not exist in database/records
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService.create(newPerson).then((returnedPerson) => {
        // Updating state in App component
        // Without this line, the front-end state will not be updated with this POST request
        setPersons(persons.concat(returnedPerson));
      });
      setMessage(`Added ${newPerson.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
    // Resetting input boxes
    setNewName("");
    setNewNumber("");
  };

  // Deleting person entry from database and records
  const removePerson = (id) => {
    const personToRemove = persons.find((person) => person.id === id);
    const confirmation = window.confirm(`Delete ${personToRemove.name} ?`);
    if (confirmation === true) {
      const newPersons = persons.filter((person) => person.id !== id);
      setPersons(newPersons);
      personService.remove(id);
      console.log("person removed from database");

      setMessage(`Removed ${personToRemove.name} from database`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
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
      <Persons persons={persons} removePerson={removePerson} />
    </div>
  );
};

export default App;
