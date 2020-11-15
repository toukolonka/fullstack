import React, { useState, useEffect } from "react";
import axios from 'axios'
import Countries from './components/Countries';
import Filter from './components/Filter';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [checkName, setCheckName] = useState("");

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleCheckChange = (event) => {
    setCheckName(event.target.value);
  };

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(checkName.toLowerCase()));

  return (
    <div>
      <Filter checkName={checkName} checkChange={handleCheckChange} />
      <Countries countries={countriesToShow} />
    </div>
  );
};

export default App;
