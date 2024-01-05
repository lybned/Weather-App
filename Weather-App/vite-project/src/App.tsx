
import './App.css';
import {useEffect, useState} from 'react';
import {Input} from "@nextui-org/react";
import axios from 'axios';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import toast, { Toaster } from 'react-hot-toast';

interface CurrentWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}

interface MinutelyForecast {
  dt: number;
  precipitation: number;
}

interface HourlyForecast {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  pop: number;
}

interface DailyForecast {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: number;
  pop: number;
  uvi: number;
}

interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  minutely: MinutelyForecast[];
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

const notify = (text : string) => toast(text);
const base_url = "http://localhost:7000/"
function App() {
  
  const [weatherInfo,setInfo] = useState<WeatherData>();
  const [location, setLocation] = useState("Calgary");
  const [locationState, setLocationState] = useState("Calgary, Alberta");
  const [targetURL, setTargetURL] = useState(base_url + "api/WeatherForecast/Weather?lon=-114.065465&lat=51.0460954")
  const [loading, setLoading] = useState(true);



  const iconPath = (path : string) => {
    return `http://openweathermap.org/img/wn/${path}@2x.png`
  }

  const getLocationURL = () => {
    return base_url + `api/WeatherForecast/Location?q=${location}`
  }

  const getWeatherURL = (lat : string, lon : string) => {
    return base_url + `api/WeatherForecast/Weather?lat=${lat}&lon=${lon}`
  }

  const getDate = (dateString : number) => {
    const temp = new Date(dateString * 1000);
    return temp.toDateString().toString();
  }

  const getTemperatureRange = (start : number, end : number) => {
    return `${start}°C to ${end}°C`;
  }

  useEffect(() => {
    axios.get(targetURL)
      .then(res => {
        //console.log(res)
        const persons = res.data;
        setInfo(persons);
        //console.log(persons)        
      })

    setLoading(false)
  },[targetURL])

  const changLocation = (e : React.KeyboardEvent<HTMLInputElement>) => {
    //console.log(location)
    if (e.key === 'Enter' && location.length > 0){
      //
      const locationURL = getLocationURL();
      axios.get(locationURL)
      .then(res => {
        const locationData = res.data;
        if (locationData.length > 0){
          const weatherURL = getWeatherURL(locationData[0].lat, locationData[0].lon)
          
          //console.log("weatherURL", weatherURL)
          if (locationData[0].state !== null && locationData[0].state !== undefined){
            setLocationState(locationData[0].name + ", " + locationData[0].state)
          } else {
            setLocationState(locationData[0].name)
          }
          setTargetURL(weatherURL)
        } else {
          notify("Location does not exist!")
        }
      })
    }

  }


  return (
    <div id="outside">
      { loading ? (<h1 className="my-5 text-white">Loading ... </h1>) : (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex items-center justify-center">
            <Input type="text" className="w-full my-4" label="Location" onKeyUp={changLocation} onValueChange={setLocation} description={<p className="text-white m-0">Press 'Enter' to get weather for the location.</p>} startContent={
              <MagnifyingGlassIcon className="h-6 w-6 text-black" />
            }/>         
          </div>

          
          <div className="w-full md:w-4/5 flex flex-col justify-center items-center currentBlock py-8 md:my-5 md:rounded-lg">
            <h1 className="text-3xl font-bold mb-5 text-white">
              Current Weather
            </h1>
            
            <div className="flex flex-col justify-center items-center">
              <p className="CityName">{locationState}</p>
              <p className="Date">{getDate(weatherInfo?.current.dt as number)}</p>
              <div className="flex justify-center items-center">
                <div>
                  <p className="Temperature">{weatherInfo?.current.temp}&deg;C</p>         
                </div>

                <img src={iconPath(weatherInfo?.current.weather[0].icon as string)}/>
              </div>
              <p className="Temperature2">Feels Like: {weatherInfo?.current.feels_like}&deg;C</p>     
              <p  className="Weather">{weatherInfo?.current.weather[0].description}</p>
            </div>            
          </div>


          <div className="w-full md:w-4/5 futureSection py-7 mt-10 md:my-5 md:rounded-lg">
            <h2 className="text-2xl font-bold mb-3 text-white text-center">
              Today and Future Forcast
            </h2>
            <div className="flex flex-wrap justify-center items-center ">
              {weatherInfo?.daily.map(day => (
                <div className="flex flex-col justify-center items-center mx-3 futureBlocks m-3 p-2 w-2/5 lg:w-1/5 rounded-lg" key={day.dt}>
                  <p className="text-white smallText">{getDate(day?.dt)}</p>

                  <img src={iconPath(day?.weather[0].icon)}/>
                  <p className="text-white smallText">{getTemperatureRange(day?.temp.min, day?.temp.max) }</p>                  
                </div>
              ))}
            </div>
          </div>

        </div>    
        )     
      }
      <Toaster />
    </div>

  )
}

export default App
