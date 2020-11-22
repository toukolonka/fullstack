import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [checkName, setCheckName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [errBit, setErrBit] = useState(0);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    var checkPersons = (person) => person.name === newName;

    if (persons.some(checkPersons)) {
      const person = persons.find((p) => p.name === newName);

      if (window.confirm(`Change ${person.name} number to ${newNumber}?`)) {
        const changedPerson = { ...person, number: newNumber };

        const id = person.id;

        personService
          .update(id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setErrBit(0);
            setMessage(`Number of ${returnedPerson.name} changed`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrBit(1);
            setMessage(
              `Person '${person.name}' was already removed from server`
            );
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPersons(persons.filter((n) => n.id !== id));
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setErrBit(0);
          setMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrBit(1);
          setMessage(error.response.data.error);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

  const deletePerson = (person) => {
    const name = person.name;
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deleteObject(person.id);
      setPersons(persons.filter((p) => p.id !== person.id));
      setErrBit(0);
      setMessage(`Deleted ${name}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleCheckChange = (event) => {
    setCheckName(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(checkName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={errBit} />
      <Filter checkName={checkName} checkChange={handleCheckChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          handleDelete={() => deletePerson(person)}
        ></Person>
      ))}
    </div>
  );
};

export default App;
