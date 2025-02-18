import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () =>{
    const [city, setCity] = useState('Kathmandu');
    const [weather, setWeather] = useState(null);
    const [unit, setUnit] = useState('metric');
    const [darkMode, setDarkMode] = useState(false);

    const API_KEY = 'a7e4ba2f18a7b0ba3dad88cf255340d0';


    useEffect(() =>{
        fetchWeather();
    }, [unit]);

    const fetchWeather = async () => {
        try{
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
            );
            setWeather(res.data);
            console.log(res.data)
        }catch(error){
            alert("city not found")
            console.error(error);
        }
    };
    const toggleUnit = () =>{
        setUnit(unit === 'metric' ? 'imperial': 'metric');
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return(
        <div className="main">
            <button onClick={toggleDarkMode} className={`mode-btn ${darkMode ? 'light-mode' : 'dark-mode'}`} >{darkMode ? "☀️ Light": "🌙 Dark"} Mode</button>

            <h2 className="title">Weather App</h2>
            <input type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} className="input-primary"/>
            <button onClick={fetchWeather} className="btn">Get Weather</button>

            {weather && (
                <div className={`card ${darkMode ? "dark-mode": "light-mode"}`}>
                    <h3>{weather.name}</h3>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon" />
                    <p>🌡️ Temperature: {weather.main.temp} {unit==='metric' ? '°C':'°F'}</p>
                    <p>🔥Max Temperature: {weather.main.temp_max} {unit==='metric' ? '°C':'°F'}</p>
                    <p>❄️Minimum Temperature: {weather.main.temp_min} {unit==='metric' ? '°C':'°F'}</p>
                    <p>☁️ Condition: {weather.weather[0].description}</p>
                    <button onClick={toggleUnit} className="mode-btn">Switch to {unit==='metric'?'°F' : '°C'}</button>
                </div>
            )}
        </div>
    )
}


export default Weather;