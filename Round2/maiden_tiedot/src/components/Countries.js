import React from "react";
import Country from './Country';

const Countries = ({ countries }) => {
  let content;

  if (countries.length > 10)
    content = <p>Too many matches, specify another filter</p>;
  else if (countries.length === 1) {
    content = <Country country={countries[0]} />;
  } else {
    content = (
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    );
  }

  return <div>{content}</div>;
};

export default Countries;
