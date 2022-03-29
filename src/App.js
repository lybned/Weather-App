import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
const api = {
  key: "cfa8c73e2907c00dc78b1876f7c5a97a",
  url_Weather: "https://api.openweathermap.org/data/2.5/weather",
  url_Location: "https://api.openweathermap.org/geo/1.0/direct"
}

{/* Sample Query: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key} */}

function App() {
  let latitude;
  let magnitude;
  const d = new Date();
  const datelist = [(d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear(), 
                    (d.getMonth()+1) + "/" + (d.getDate()+1) + "/" + d.getFullYear(),
                    (d.getMonth()+1) + "/" + (d.getDate()+2) + "/" + d.getFullYear(),
                    (d.getMonth()+1) + "/" + (d.getDate()+3) + "/" + d.getFullYear(),
                    (d.getMonth()+1) + "/" + (d.getDate()+4) + "/" + d.getFullYear()];
  console.log(`${api.url_Location}?q=Calgary&limit=5&appid=${api.key}`);
  fetch(`${api.url_Location}?q=Calgary&limit=5&appid=${api.key}`)
  .then(response => response.json())
  .then(data => {
    latitude = data[0]["lat"];
    magnitude = data[0]["lon"];
  });


  console.log(`${api.url_Weather}?lat=${latitude}&lon=${magnitude}&appid=${api.key}`);
  fetch(`${api.url_Weather}?lat=${latitude}&lon=${magnitude}&appid=${api.key}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
  });
    

  return (
    <div>
      <body>
        <div className="search">
          <input type="test" placeholder="location..." className="search-bar"/>
        </div>

        <div className="box">
          <div className="CityName">Calgary, Alberta</div>
          <div className="Date">{datelist[0]}</div>
          <div className="Temperature">23&deg;C</div>
          <div className="Weather">Sunny</div>
          
          <div className="future">
            <div className="futureWeather">
              <h3>{datelist[1]}</h3> <img className="WeatherIcon" src={logo} alt="Weather Icon"/>    <h7>Sunny <br /> 20&deg;C</h7>
            </div>

            <div className="futureWeather">
              <h3>{datelist[2]}</h3> <img className="WeatherIcon" src={logo} alt="Weather Icon"/>    <h7>Sunny <br /> 20&deg;C</h7>
            </div>

            <div className="futureWeather">
              <h3>{datelist[3]}</h3> <img className="WeatherIcon" src={logo} alt="Weather Icon"/>    <h7>Sunny <br /> 20&deg;C</h7>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
