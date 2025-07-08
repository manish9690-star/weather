import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Search.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState("");

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "b1b752f79abc3db45251224edecca753";

  const getWeatherInfo = async () => {
    const response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    const jsonResponse = await response.json();
    const result = {
      city: city,
      temp: jsonResponse.main.temp,
      tempMin: jsonResponse.main.temp_min,
      tempMax: jsonResponse.main.temp_max,
      humidity: jsonResponse.main.humidity,
      feelsLike: jsonResponse.main.feels_like,
      weather: jsonResponse.weather[0].description
    };

    return result;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const newInfo = await getWeatherInfo();
    updateInfo(newInfo);
    setCity("");
  };

  const handleChange = (evt) => {
    setCity(evt.target.value);
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter City"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br /><br />
        <Button variant="contained" type="submit">
          Search
        </Button>
      </form>
    </div>
  );
}