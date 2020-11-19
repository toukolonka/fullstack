import React from "react";
import Person from './Person';

const Persons = ({ persons, handledelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          handledelete={handledelete}
        ></Person>
      ))}
    </div>
  );
};

export default Persons;
