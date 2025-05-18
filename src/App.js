import './App.css';
import {useState} from "react";
import Sunny from './Assets/sunny.png';
import Cold from './Assets/cold.png';
import Pleasant from './Assets/pleasant.png';


const api = {
  key: "834e4007e4deb42e5f805a2ffeb37ae2",
  base: "https://api.openweathermap.org/data/2.5/"
}

function TodaysDate() {
  var options = {weekday: "long",
                 year: "numeric", 
                 month: "long",
                 day: "numeric"};
  let date = new Date();
  date = date.toLocaleDateString("en-US", options);
   
  return date;
}

function getWeatherIcon(feels) {
  if (feels < 7) {
    return <img src={Cold} alt="Cold" className="weather-icon" />;
  } else if (feels >= 7 && feels < 17) {
    return <img src={Pleasant} alt="Pleasant" className="weather-icon" />;
  } else {
    return <img src={Sunny} alt="Sunny" className="weather-icon" />;
  }
}

function App() {
  const[weather, setWeather] = useState(null);
  const[location, setLocation] = useState("Abu Dhabi");

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${location}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setLocation("");
          setWeather(result);
          console.log(result);
        })
    }
  }

  const [isCelsius, setIsCelsius] = useState(true);

  const toggleUnit = () => {
    setIsCelsius(prev => !prev);
  };

  
  return (
    <div className="app"> 
        <main>
        
        <br/>

        <div className="todaysDate">
          <TodaysDate/>
        </div>

        <div className="titleText">
          <text>What's the weather like today?</text>
        </div>

        <br/>

        <div className="searchBox">
          <input type="text" className="searchBar" placeholder="Search for a place..."
          onChange={e => setLocation(e.target.value)}
          value={location}
          onKeyPress={search}
          />
        </div>

        {(weather && weather.main) ? (
          <div>
            <div className='weather-box'>
              <div className="weather-box">
                <div className="weather-content">
                  <h2> {weather.name}, {weather.sys.country}</h2>
                  <p>
                    {isCelsius 
                      ? `Feels like ${Math.round(weather.main.feels_like)}°C` 
                      : `Feels like ${Math.round((weather.main.feels_like * 9/5) + 32)}°F`}
                  </p>
                  <p>{getWeatherIcon(Math.round(weather.main.feels_like))}</p>

                  <h1>
                    {isCelsius 
                      ? `${Math.round(weather.main.temp)}°C` 
                      : `${Math.round((weather.main.temp * 9/5) + 32)}°F`}
                    <button className="toggle-btn" onClick={toggleUnit}>
                      {isCelsius ? "Switch to °F" : "Switch to °C"}
                    </button>
                  </h1>

                  <p>
                    {isCelsius 
                      ? `Low: ${Math.round(weather.main.temp_min)}°C | High: ${Math.round(weather.main.temp_max)}°C` 
                      : `Low: ${Math.round((weather.main.temp_min * 9/5) + 32)}°F | High: ${Math.round((weather.main.temp_max * 9/5) + 32)}°F`}
                  </p>
                  <p>Wind Speed: {Math.round(weather.wind.speed * 3.6)} km/h</p>
                </div>
              </div>
            </div>
          </div>
        ) : ("")}

      </main>
    </div>
  );
}

export default App;
