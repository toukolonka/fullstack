import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState("");
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (typeof capital === "string")
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
        )
        .then((response) => {
          setWeather(response.data.current);
        });
  }, [capital, api_key]);

  return (
    <div>
      <p>temperature: {weather.temperature} Celsius</p>
      <img src={weather.weather_icons} alt="Icon" width="10%" height="10%" />
      <p>
        wind: {weather.wind_speed} mph direction {weather.wind_dir}
      </p>
    </div>
  );
};

export default Weather;
