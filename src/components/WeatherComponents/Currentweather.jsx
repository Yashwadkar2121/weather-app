import { motion } from "framer-motion";

function CurrentWeather({ data, location, isFullScreen, onClose }) {
  const weatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight showers",
    81: "Moderate showers",
    82: "Violent showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Heavy thunderstorm with hail",
  };

  const getWindDirection = (degrees) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  // Compact view for dashboard
  if (!isFullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white h-full flex flex-col"
      >
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold mb-2">Current Weather</h3>
          <p className="text-white/70 text-sm">Real-time Conditions</p>
        </div>

        <div className="flex-1 space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">{data.temperature_2m}°C</p>
            <p className="text-lg">{weatherCodes[data.weather_code]}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-center">
              <p className="text-white/70">Humidity</p>
              <p className="font-semibold text-lg">
                {data.relative_humidity_2m}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-white/70">Rain</p>
              <p className="font-semibold text-lg">{data.rain || 0} mm</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white/70">Time of Day</p>
            <p className="text-lg font-semibold">
              {data.is_day ? "☀️ Day" : "🌙 Night"}
            </p>
          </div>
        </div>

        <p className="text-center text-white/60 text-sm mt-4">
          Click for detailed view
        </p>
      </motion.div>
    );
  }

  // Full screen view
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white w-full max-w-4xl max-h-[90vh] overflow-y-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold">Current Weather Details</h2>
          <p className="text-white/70 text-lg">
            {location.name}, {location.country}
          </p>
          <p className="text-white/60">
            {data.is_day ? "☀️ Daytime" : "🌙 Nighttime"} •{" "}
            {weatherCodes[data.weather_code]}
          </p>
        </div>
        <button
          onClick={onClose}
          className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors flex-shrink-0"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Main Weather Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Temperature Section */}
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-sm text-white/70 mb-1">Temperature</p>
          <p className="text-3xl font-bold">{data.temperature_2m}°C</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-sm text-white/70 mb-1">Feels Like</p>
          <p className="text-2xl font-bold">{data.apparent_temperature}°C</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-sm text-white/70 mb-1">Humidity</p>
          <p className="text-3xl font-bold">{data.relative_humidity_2m}%</p>
        </div>

        {/* Precipitation Section */}
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-sm text-white/70 mb-1">Rain</p>
          <p className="text-2xl font-bold">{data.rain || 0} mm</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-sm text-white/70 mb-1">Showers</p>
          <p className="text-2xl font-bold">{data.showers || 0} mm</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-sm text-white/70 mb-1">Snowfall</p>
          <p className="text-2xl font-bold">{data.snowfall || 0} cm</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-sm text-white/70 mb-1">Precipitation</p>
          <p className="text-2xl font-bold">{data.precipitation || 0} mm</p>
        </div>

        {/* Wind Section */}
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-sm text-white/70 mb-1">Wind Speed</p>
          <p className="text-2xl font-bold">{data.wind_speed_10m} km/h</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-sm text-white/70 mb-1">Wind Direction</p>
          <p className="text-2xl font-bold">
            {getWindDirection(data.wind_direction_10m)}
          </p>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-sm text-white/70 mb-1">Wind Gusts</p>
          <p className="text-2xl font-bold">{data.wind_gusts_10m} km/h</p>
        </div>

        {/* Pressure & Cloud Section */}
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-sm text-white/70 mb-1">Pressure</p>
          <p className="text-2xl font-bold">{data.surface_pressure} hPa</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-sm text-white/70 mb-1">Cloud Cover</p>
          <p className="text-2xl font-bold">{data.cloud_cover}%</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-sm text-white/70 mb-1">Weather Code</p>
          <p className="text-xl font-bold">{data.weather_code}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default CurrentWeather;
