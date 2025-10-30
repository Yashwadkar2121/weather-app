import { motion } from "framer-motion";

function HourlyWeather({ data, location, isFullScreen, onClose }) {
  const weatherCodes = {
    0: "Clear",
    1: "Clear",
    2: "Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Fog",
    51: "Drizzle",
    53: "Drizzle",
    55: "Drizzle",
    61: "Rain",
    63: "Rain",
    65: "Rain",
    71: "Snow",
    73: "Snow",
    75: "Snow",
    80: "Showers",
    81: "Showers",
    82: "Showers",
    85: "Snow",
    86: "Snow",
    95: "Storm",
    96: "Storm",
    99: "Storm",
  };

  const hoursToShow = isFullScreen ? 24 : 6;
  const hourlyData = data.time.slice(0, hoursToShow).map((time, index) => ({
    time: new Date(time),
    formattedTime: new Date(time).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    }),
    temperature: data.temperature_2m[index],
    humidity: data.relative_humidity_2m[index],
    rain: data.rain?.[index] || 0,
    weatherCode: data.weather_code[index],
    apparentTemp: data.apparent_temperature?.[index],
    dewPoint: data.dew_point_2m?.[index],
    precipitation: data.precipitation?.[index],
    precipitationProb: data.precipitation_probability?.[index],
    showers: data.showers?.[index],
    snowfall: data.snowfall?.[index],
    snowDepth: data.snow_depth?.[index],
    cloudCover: data.cloud_cover?.[index],
    visibility: data.visibility?.[index],
    windSpeed: data.wind_speed_10m?.[index],
    windDirection: data.wind_direction_10m?.[index],
    windGusts: data.wind_gusts_10m?.[index],
    uvIndex: data.uv_index?.[index],
    isDay: data.is_day?.[index],
  }));

  if (!isFullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white h-full flex flex-col"
      >
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold mb-2">Hourly Forecast</h3>
          <p className="text-white/70 text-sm">Next 6 Hours</p>
        </div>

        <div className="flex-1 space-y-3">
          {hourlyData.map((hour, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white/5 rounded-lg p-3"
            >
              <span className="font-semibold text-sm">
                {hour.formattedTime}
              </span>
              <span className="text-lg font-bold">{hour.temperature}°C</span>
              <div className="text-right">
                <p className="text-xs text-white/70">💧 {hour.rain}mm</p>
                <p className="text-xs text-white/70">
                  {weatherCodes[hour.weatherCode]}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-white/60 text-sm mt-4">
          Click for 24-hour forecast
        </p>
      </motion.div>
    );
  }

  // ✅ Full screen view with gradient background
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-blue-400 to-purple-600 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white w-full max-w-7xl max-h-[90vh] overflow-y-auto transition-all duration-700"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold">24-Hour Forecast</h2>
          <p className="text-white/70 text-lg">
            {location.name}, {location.country}
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

      {/* Hourly Forecast Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
          >
            <div className="text-center mb-3">
              <p className="font-semibold text-lg mb-1">{hour.formattedTime}</p>
              <p className="text-white/70 text-sm">
                {weatherCodes[hour.weatherCode]}
              </p>
              <p className="text-2xl font-bold my-2">{hour.temperature}°C</p>
              <p className="text-sm text-white/70">
                Feels like {hour.apparentTemp}°C
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-white/70">Humidity</p>
                  <p className="font-semibold">{hour.humidity}%</p>
                </div>
                <div>
                  <p className="text-white/70">Rain</p>
                  <p className="font-semibold">{hour.rain} mm</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-white/70">Precip %</p>
                  <p className="font-semibold">{hour.precipitationProb}%</p>
                </div>
                <div>
                  <p className="text-white/70">Wind</p>
                  <p className="font-semibold">{hour.windSpeed} km/h</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-white/70">Clouds</p>
                  <p className="font-semibold">{hour.cloudCover}%</p>
                </div>
                <div>
                  <p className="text-white/70">UV Index</p>
                  <p className="font-semibold">{hour.uvIndex}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default HourlyWeather;
