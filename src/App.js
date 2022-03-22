import logo from './logo.svg';
import './App.css';

function App() {

  const d = new Date();
  const date = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
  return (
    <div>
      <body>
        <div className="search">
          <input type="test" placeholder="location..." className="search-bar"/>
        </div>

        <div className="box">
          <div className="CityName">Calgary, Alberta</div>
          <div className="Date">{date}</div>
          <div className="Temperature">23&deg;C</div>
          <div className="Weather">Sunny</div>

        </div>
      </body>
    </div>
  );
}

export default App;
