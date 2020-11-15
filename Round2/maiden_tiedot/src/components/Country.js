import React from "react";
import Weather from './Weather';

const Country = ({ country }) => {
    return ( 
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map((language) => (
                <li key={language.name}>{language.name}</li>
                ))}
            </ul>
            <img src={country.flag} alt="Flag" width="10%" height="10%" />
            <h2>weather in {country.capital}</h2>
            <Weather capital={country.capital} />
      </div>
     );
}
 
export default Country;