import { useState } from "react";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "def3ccb66bfcbf8aa083b73603fdfc32";

  const getWeather = async () => {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setError("Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();

      if (data.cod !== 200) {
        setError(data.message || "City not found");
        return;
      }

      setWeather(data);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">

      {/* HEADER */}
      <div className="header">
        <h1>NAS WEATHER FINDER</h1>
        <p>Jhoans C. San Agustin</p>
        <p>BSIT-2A</p>
      </div>

      {/* SEARCH ROW */}
      <div className="search-row">
        <input
          placeholder="Type city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {loading && <p className="status">Loading weather...</p>}
      {error && <p className="error">{error}</p>}

      {/* WEATHER CARD */}
      {weather?.main && (
        <div className="card">
          <h2>{weather.name}</h2>
          <div className="weather-info">
            <p>🌡 {weather.main.temp}°C</p>
            <p>☁ {weather.weather[0].main}</p>
          </div>
        </div>
      )}
    </div>
  );
}