import { useState } from "react";
import CurrentWeather from "./WeatherComponents/Currentweather";
import HourlyWeather from "./WeatherComponents/HourlyWeather";
import DailyWeather from "./WeatherComponents/DailyWeather";

function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeComponent, setActiveComponent] = useState(null);

  const fetchAllWeatherData = async (cityName) => {
    if (!cityName.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Get coordinates from city name
      const geocodingResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          cityName
        )}&count=1`
      );
      const geocodingData = await geocodingResponse.json();

      if (!geocodingData.results || geocodingData.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name, country } = geocodingData.results[0];

      // Fetch weather data
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum&timezone=auto&forecast_days=7`
      );

      const weatherData = await weatherResponse.json();

      if (!weatherData.current) {
        throw new Error("Weather data not available");
      }

      setWeatherData({
        current: weatherData.current,
        hourly: weatherData.hourly,
        daily: weatherData.daily,
        location: { name, country, latitude, longitude },
      });
    } catch (err) {
      setError(err.message || "Failed to fetch weather data");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleComponentClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const handleCloseFullScreen = () => {
    setActiveComponent(null);
  };

  const renderFullScreenComponent = () => {
    if (!activeComponent || !weatherData) return null;

    const props = {
      data: weatherData[activeComponent],
      location: weatherData.location,
      onClose: handleCloseFullScreen,
      isFullScreen: true,
    };

    switch (activeComponent) {
      case "current":
        return <CurrentWeather {...props} />;
      case "hourly":
        return <HourlyWeather {...props} />;
      case "daily":
        return <DailyWeather {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Search Section */}
      <div className="mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-white mb-2">
              Weather Forecast
            </h1>
            <p className="text-white/80">
              Get detailed weather information for any city
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              fetchAllWeatherData(formData.get("city"));
            }}
            className="mb-6"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                name="city"
                placeholder="Enter city name (e.g., London, New York, Tokyo)..."
                className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-base"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {loading ? "Loading..." : "Get Weather"}
              </button>
            </div>
          </form>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-lg mb-4">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* 🌍 City Name Display */}
      {weatherData && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-white drop-shadow-sm">
            {weatherData.location.name}, {weatherData.location.country}
          </h2>
          <p className="text-white/70 mt-2 text-sm">
            Latitude: {weatherData.location.latitude.toFixed(2)}° | Longitude:{" "}
            {weatherData.location.longitude.toFixed(2)}°
          </p>
        </div>
      )}

      {/* Weather Dashboard */}
      {weatherData && !activeComponent && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div
            onClick={() => handleComponentClick("daily")}
            className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
          >
            <DailyWeather
              data={weatherData.daily}
              location={weatherData.location}
              isFullScreen={false}
            />
          </div>

          <div
            onClick={() => handleComponentClick("current")}
            className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
          >
            <CurrentWeather
              data={weatherData.current}
              location={weatherData.location}
              isFullScreen={false}
            />
          </div>

          <div
            onClick={() => handleComponentClick("hourly")}
            className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
          >
            <HourlyWeather
              data={weatherData.hourly}
              location={weatherData.location}
              isFullScreen={false}
            />
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white/80">Fetching weather data...</p>
          </div>
        </div>
      )}

      {activeComponent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {renderFullScreenComponent()}
        </div>
      )}

      {!weatherData && !loading && !error && (
        <div className="text-center text-white/60 mt-12">
          <p className="text-lg">Enter a city name to view weather forecasts</p>
          <p className="text-sm mt-2">
            Click on any weather card to see detailed information
          </p>
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;
