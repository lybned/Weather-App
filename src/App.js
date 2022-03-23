import logo from './logo.svg';
import './App.css';

function App() {

  const d = new Date();
  const datelist = [(d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear(), 
                    (d.getMonth()+1) + "/" + (d.getDate()+1) + "/" + d.getFullYear(),
                    (d.getMonth()+1) + "/" + (d.getDate()+2) + "/" + d.getFullYear(),
                    (d.getMonth()+1) + "/" + (d.getDate()+3) + "/" + d.getFullYear(),
                    (d.getMonth()+1) + "/" + (d.getDate()+4) + "/" + d.getFullYear()];
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
            <div className="futureWeather"><h3>{datelist[1]}</h3> <img className="WeatherIcon" src={logo} alt="Weather Icon"/>    <h7>20&deg;C</h7></div>
            <div className="futureWeather"><h3>{datelist[2]}</h3> <img className="WeatherIcon" src={logo} alt="Weather Icon"/>    <h7>20&deg;C</h7></div>
            <div className="futureWeather"><h3>{datelist[3]}</h3> <img className="WeatherIcon" src={logo} alt="Weather Icon"/>    <h7>20&deg;C</h7></div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
