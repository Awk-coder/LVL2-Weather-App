import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Loading from "./Loading";

function WeatherApp() {
  const [weather, setWeather] = useState({ data: {}, loading: false });
  const [input, setInput] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [bgColor, setBgColor] = useState("bg-grey-900");
  const [unit, setUnit] = useState("C");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.backgroundColor = ""; // Reset to default when unmounted
    };
  }, []);

  const date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = date.getDate();
  let month = date.getMonth();
  var dateToday = months[month] + " " + day + ", " + date.getFullYear();

  const search = async (event) => {
    if (event.key === "Enter") {
      const apiKey = "ed718ef35982b314580aa678a372c038";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`;

      setWeather({ ...weather, loading: true });

      try {
        const response = await axios.get(apiUrl);
        setWeather({ data: response.data, loading: false });
        setInput("");
        const color = getBackgroundColor(response.data.weather[0].description);
        setBgColor(color);
        document.body.style.backgroundColor = color;
      } catch (err) {
        console.error("Something went wrong with the API call");
        setWeather({ ...weather, loading: false });
      }
    }
  };

  const convertTemperature = (tempInCelsius) => {
    return unit === "C" ? tempInCelsius : (tempInCelsius * 9) / 5 + 32; // Convert to Fahrenheit
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const getBackgroundColor = (weatherDescription) => {
    switch (weatherDescription.toLowerCase()) {
      case "clear sky":
        return "rgba(255, 255, 0, 0.5)"; // Clear and sunny (yellow with 50% opacity)
      case "few clouds":
        return "rgba(173, 216, 230, 0.5)"; // Few clouds (light blue with 50% opacity)
      case "scattered clouds":
        return "rgba(169, 169, 169, 0.5)"; // Scattered clouds (dark gray with 50% opacity)
      case "broken clouds":
        return "rgba(128, 128, 128, 0.5)"; // Broken clouds (gray with 50% opacity)
      case "overcast clouds":
        return "rgba(105, 105, 105, 0.5)"; // Overcast clouds (dim gray with 50% opacity)
      case "light rain":
        return "rgba(70, 130, 180, 0.5)"; // Light rain (steel blue with 50% opacity)
      case "moderate rain":
        return "rgba(0, 0, 255, 0.5)"; // Moderate rain (blue with 50% opacity)
      case "heavy intensity rain":
        return "rgba(0, 0, 139, 0.5)"; // Heavy rain (dark blue with 50% opacity)
      case "very heavy rain":
        return "rgba(0, 0, 128, 0.5)"; // Very heavy rain (navy with 50% opacity)
      case "extreme rain":
        return "rgba(0, 0, 128, 0.5)"; // Extreme rain (same as very heavy, navy with 50% opacity)
      case "shower rain":
        return "rgba(0, 191, 255, 0.5)";
      case "light intensity shower rain":
        return "rgba(0, 191, 255, 0.5)"; // Shower rain (deep sky blue with 50% opacity)
      case "rain":
        return "rgba(30, 144, 255, 0.5)"; // General rain (dodger blue with 50% opacity)
      case "thunderstorm":
        return "rgba(169, 169, 169, 0.5)"; // Thunderstorm (dark gray with 50% opacity)
      case "snow":
        return "rgba(255, 255, 255, 0.5)"; // Snow (white with 50% opacity)
      case "light snow":
        return "rgba(155, 255, 255, 0.5)"; // Light snow (same as snow, white with 50% opacity)
      case "heavy snow":
        return "rgba(211, 211, 211, 0.5)"; // Heavy snow (light gray with 50% opacity)
      case "sleet":
        return "rgba(128, 128, 128, 0.5)"; // Sleet (gray with 50% opacity)
      case "fog":
        return "rgba(211, 211, 211, 0.5)"; // Fog (light gray with 50% opacity)
      case "mist":
        return "rgba(169, 169, 169, 0.5)"; // Mist (dark gray with 50% opacity)
      case "haze":
        return "rgba(169, 169, 169, 0.5)"; // Haze (dark gray with 50% opacity)
      case "dust":
        return "rgba(139, 69, 19, 0.5)"; // Dust (saddle brown with 50% opacity)
      case "sand":
        return "rgba(222, 184, 135, 0.5)"; // Sand (burlywood with 50% opacity)
      case "ash":
        return "rgba(128, 128, 128, 0.5)"; // Ash (gray with 50% opacity)
      case "squall":
        return "rgba(128, 128, 128, 0.5)"; // Squall (gray with 50% opacity)
      case "tornado":
        return "rgba(105 , 105, 105, 0.5)"; // Tornado (dim gray with 50% opacity)
      default:
        return "rgba(105, 105, 105, 0.5)"; // Default background color for unknown conditions (dim gray with 50% opacity)
    }
  };

  return (
    <>
      <div className={`container ${bgColor}`}>
        <div id="clock" className="clock">
          {time}
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search"
          onKeyPress={search}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="py-3">
          <button className="button-alternate" onClick={toggleUnit}>
            Switch to °{unit === "C" ? "F" : "C"}
          </button>
        </div>
        {weather.loading ? (
          <Loading />
        ) : (
          weather.data.main && (
            <div>
              <h3 className="h1">{dateToday}</h3>
              <h2 className="h2">{weather.data.name}</h2>
              <div className="sidebyside">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                  alt={weather.data.weather[0].description}
                />
                <p className="temp">
                  {convertTemperature(weather.data.main.temp - 273.15).toFixed(
                    1
                  )}{" "}
                  °{unit}
                </p>
              </div>
              <p className="paras">
                Weather: {weather.data.weather[0].description}
              </p>
              <p className="paras">Humidity: {weather.data.main.humidity}%</p>
              <p className="paras">Wind Speed: {weather.data.wind.speed} m/s</p>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default WeatherApp;
