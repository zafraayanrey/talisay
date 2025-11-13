import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create a context with default value
export const MyContext = createContext("Default Value");

export default function CountriesList() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://api.first.org/data/v1/countries"
        );
        setCountries(Object.values(response.data.data)); // convert object to array
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <MyContext.Provider countries={countries}>
      <div>
        <h1>Asian Countries</h1>
        <ul>
          {countries.map((country, index) => (
            <li key={index}>{country.country}</li>
          ))}
        </ul>
      </div>
    </MyContext.Provider>
  );
}
