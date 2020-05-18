import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
      console.log(response)
      setPersons(response.data)
    })
  }, [])

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
      axios.get('http://localhost:3001/persons').then(response => {
        setPersons(response.data);
      })
    }
  };

  const handleNewPerson = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);
    if (names.includes(newName) === true) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
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
      <Persons persons={persons} />
    </div>
  );
};

export default App;
