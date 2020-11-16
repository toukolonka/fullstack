import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [checkName, setCheckName] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleCheckChange = (event) => {
    setCheckName(event.target.value);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(checkName.toLowerCase())
  );

  let content;

  if (countriesToShow.length > 10)
    content = <p>Too many matches, specify another filter</p>;
  else if (countriesToShow.length === 1) {
    content = <Country country={countriesToShow[0]} />;
  } else {
    content = (
      <ul>
        {countriesToShow.map((country) => (
          <li key={country.name}>
            {country.name}
            <button onClick={() => setCheckName(country.name)}>show</button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <Filter checkName={checkName} checkChange={handleCheckChange} />
      {content}
    </div>
  );
};

export default App;
