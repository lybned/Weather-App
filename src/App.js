import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
const api = {
  key: "cfa8c73e2907c00dc78b1876f7c5a97a",
  url_Weather: "https://api.openweathermap.org/data/2.5/weather",
  url_Location: "https://api.openweathermap.org/geo/1.0/direct",
  future_forcast: "https://api.openweathermap.org/data/2.5/onecall"
}

{/* Sample Query: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key} */}

function App() {
  //let latitude;
  //let magnitude;


  const [weatherInfo,setInfo] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [key, setKey] = useState("")
  const [icon1, setIcon1] = useState("");
  const [buffer, setBuffer] = useState("");
  const [future, setFuture] = useState(null);





  

  const d = new Date();
  const datelist = [(d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear(), 
                    (d.getMonth()+1) + "/" + (d.getDate()+1) + "/" + d.getFullYear(),
                    (d.getMonth()+1) + "/" + (d.getDate()+2) + "/" + d.getFullYear(),
                    (d.getMonth()+1) + "/" + (d.getDate()+3) + "/" + d.getFullYear(),
                    (d.getMonth()+1) + "/" + (d.getDate()+4) + "/" + d.getFullYear()];

  {/* API call to the information for the location */}
  console.log(`${api.url_Location}?q=${buffer}&limit=5&appid=${api.key}`);
  const keyPress = (event) =>
  {
    setKey(event.key);
    
    if (event.key == "Enter" && buffer != "")
    {
      //console.log(11);
      fetch(`${api.url_Location}?q=${buffer}&limit=5&appid=${api.key}`)
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        //if we cannot find a location
        if (data.length > 0)
        {
          console.log(data);
          setLocationInfo(data);
          const latitude = data[0].lat;
          const lontitude = data[0].lon;

          console.log(`${api.url_Weather}?lat=${latitude}&lon=${lontitude}&appid=${api.key}`, 'setMagnitude' );
          //if (latitude != null && magnitude != null)
          //{
          //console.log(22);
          fetch(`${api.url_Weather}?lat=${latitude}&lon=${lontitude}&appid=${api.key}&units=metric`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + data["main"]["temp"]);
            setIcon1(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

            setInfo(data);
            //setBuffer("");
            fetch(`${api.future_forcast}?lat=${latitude}&lon=${lontitude}&units=metric&appid=${api.key}`)
            .then(response => response.json())
            .then(data =>{
              console.log(`${api.future_forcast}?lat=${latitude}&lon=${lontitude}&units=metric&appid=${api.key}`);
              console.log(data);
              setFuture(data);
            });
          });            
        }
        else
        {
          setLocationInfo(null);
          setInfo(null);
        }
         
      }); 
      
 
      //}
    }

  };



  //console.log(`${api.url_Weather}?lat=${latitude}&lon=${magnitude}&appid=${api.key}`);
  {/*if (latitude != null & magnitude != null)
  {
    fetch(`${api.url_Weather}?lat=${latitude}&lon=${magnitude}&appid=${api.key}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + data["main"]["temp"]);
      setInfo(data);
      //changeTemp(data["main"]["temp"]);
    },
    (error) => {
      console.log(error);
    });    
  }
*/}


  return (
    <div>
      <body>
        <div className="search">
          <input type="text" placeholder="location..." className="search-bar" onKeyPress={(e) => keyPress(e)} onChange={event => setBuffer(event.target.value)} value={buffer}/>
        </div>

      {/* Only renders the page if the user entered a valid location*/}
      {(weatherInfo != null && locationInfo != null && future != null) ? (
        <div className="box">
          <div className="CityName">{locationInfo[0].name}, {locationInfo[0].state}</div>
          <div className="Date">{datelist[0]}</div>
          <div className="Temperature">{weatherInfo.main.temp}&deg;C <img id="today" src={icon1} alt="Weather Icon"/> </div>

          <div className="Weather">{weatherInfo.weather[0].description}</div>

          
          <div className="future">
            <div className="futureWeather">
              <h3>{datelist[1]}</h3> <img className="WeatherIcon" src={logo} alt="Weather Icon"/>    <h7>{future.daily[1].weather[0].main} <br /> 20&deg;C</h7>
            </div>

            <div className="futureWeather">
              <h3>{datelist[2]}</h3> <img className="WeatherIcon" src={logo} alt="Weather Icon"/>    <h7>{future.daily[2].weather[0].main} <br /> 20&deg;C</h7>
            </div>

            <div className="futureWeather">
              <h3>{datelist[3]}</h3> <img className="WeatherIcon" src={logo} alt="Weather Icon"/>    <h7>{future.daily[3].weather[0].main} <br /> 20&deg;C</h7>
            </div>

            {/*Used for testing, delete after testing is complete*/}
            <div>
              <p>Current Key entered: {key}</p>
              <p>Buff contains: {buffer}</p>
            </div>
          </div>
        </div>

      ) : ("") }
      </body>
    </div>
  );
}

export default App;
