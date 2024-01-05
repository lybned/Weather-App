const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());


app.get("/api/WeatherForecast/Location", (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'The query parameter is required' });
  }

  try {
    const response = axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=5&appid=${process.env.APIKEY}`)
      .then((result) => { res.status(200).json(result.data) });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
})


app.get("/api/WeatherForecast/Weather", (req, res) => {
  const { lon,lat } = req.query;

  if (!lon || !lat) {
    return res.status(400).json({ error: 'Both query parameters are required' });
  }

  try {
    const response = axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.APIKEY}&units=metric`)
      .then((result) => { res.status(200).json(result.data) });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
})

const server = app.listen(process.env.PORT, () => {

  console.log(`Server Started on Port ${process.env.PORT}`);

})