import React, { useState, useEffect } from "react";
import axios from "axios";

const Languages = ({ languages }) => {
  return (
    <div>
      <ul>
        {languages.map((language) => (
          <li key={languages.indexOf(language)}>{language.name}</li>
        ))}
      </ul>
    </div>
  );
};

const Flag = ({ flag }) => {
  return (
    <div>
      <img src={flag} width="100" height="100" />
    </div>
  );
};

const Results = ({ results }) => {
  // Conditional rendering
  // 1. No search entry
  if (results.length === 250) {
    return <div></div>;
  }
  // 2. Too many countries
  else if (results.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }
  // 3. Only 1 country (full info)
  else {
    if (results.length === 1) {
      const result = results[0];
      return (
        <div>
          <h2>{result.name}</h2>
          <p key={result.id}>capital {result.capital}</p>
          <p key={result.id}>population {result.population}</p>
          <h2>languages</h2>
          <Languages languages={result.languages} />
          <Flag flag={result.flag} />
        </div>
      );
    } else {
      return (
        <div>
          {results.map((result) => (
            <p key={result.id}>{result.name}</p>
          ))}
        </div>
      );
    }
  }
};

const CountryForm = ({ country, handleNewCountry }) => {
  return (
    <div>
      <form>
        find countries <input value={country} onChange={handleNewCountry} />
      </form>
    </div>
  );
};

const App = () => {
  const [country, setCountry] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log("Retrieving data from API");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log(response.data);
      setResults(response.data);
    });
  }, []);

  // Building changes in input state
  const handleNewCountry = (event) => {
    console.log(event.target.value);
    setCountry(event.target.value);
    const filteredCountries = results.filter((result) =>
      result.name.toLowerCase().includes(country.toLowerCase())
    );
    console.log(filteredCountries);
    setResults(filteredCountries);
  };

  return (
    <div>
      <CountryForm country={country} handleNewCountry={handleNewCountry} />
      <Results results={results} />
    </div>
  );
};

export default App;
