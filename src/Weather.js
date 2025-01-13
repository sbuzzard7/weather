import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=6557810176c36fac5f0db536711a6c52`
      );
      setWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, );

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className='weatherbox'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData ? (
        <>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {Math.round(weatherData.main.temp)}°F</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Feels like : {Math.round(weatherData.main.feels_like)}°F</p>
          <p>Humidity : {weatherData.main.humidity}%</p>
          <p>Wind Speed : {Math.round(weatherData.wind.speed)} mph</p>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Weather;