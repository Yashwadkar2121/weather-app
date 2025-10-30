import { motion } from "framer-motion";

function DailyWeather({ data, location, isFullScreen, onClose }) {
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

  const dailyData = data.time.map((date, index) => ({
    date: new Date(date),
    formattedDate: new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    weatherCode: data.weather_code[index],
    sunrise: data.sunrise?.[index],
    sunset: data.sunset?.[index],
    rainSum: data.rain_sum?.[index] || 0,
    maxTemp: data.temperature_2m_max?.[index],
    minTemp: data.temperature_2m_min?.[index],
    snowfallSum: data.snowfall_sum?.[index],
    windSpeedMax: data.wind_speed_10m_max?.[index],
    uvIndexMax: data.uv_index_max?.[index],
    precipitationProbMax: data.precipitation_probability_max?.[index],
  }));

  // Compact view
  if (!isFullScreen) {
    const today = dailyData[0];
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white h-full flex flex-col"
      >
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold mb-2">Daily Forecast</h3>
          <p className="text-white/70 text-sm">Today's Overview</p>
        </div>

        <div className="flex-1 space-y-4">
          <div className="text-center">
            <p className="text-2xl font-bold mb-1">
              {weatherCodes[today.weatherCode]}
            </p>
            <p className="text-3xl font-bold">☀️</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-center">
              <p className="text-white/70">Sunrise</p>
              <p className="font-semibold">
                {today.sunrise
                  ? new Date(today.sunrise).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-white/70">Sunset</p>
              <p className="font-semibold">
                {today.sunset
                  ? new Date(today.sunset).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white/70">Rain Today</p>
            <p className="text-xl font-bold">{today.rainSum} mm</p>
          </div>
        </div>

        <p className="text-center text-white/60 text-sm mt-4">
          Click for 7-day forecast
        </p>
      </motion.div>
    );
  }

  // Fullscreen gradient view
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-blue-400 to-purple-600 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold">7-Day Forecast</h2>
          <p className="text-white/80 text-lg">
            {location.name}, {location.country}
          </p>
        </div>
        <button
          onClick={onClose}
          className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors border border-white/20"
        >
          <svg
            className="w-6 h-6 text-white"
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {dailyData.map((day, index) => (
          <div
            key={index}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center transition-all duration-300"
          >
            <p className="font-semibold text-lg mb-2">{day.formattedDate}</p>
            <p className="text-white/70 mb-2">
              {weatherCodes[day.weatherCode]}
            </p>
            <p className="text-2xl font-bold mb-3">
              {day.maxTemp}° / {day.minTemp}°C
            </p>
            <p className="text-white/80">
              ☀️ Sunrise:{" "}
              {new Date(day.sunrise).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-white/80">
              🌙 Sunset:{" "}
              {new Date(day.sunset).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="mt-2 text-white/80">💧 Rain: {day.rainSum} mm</p>
            <p className="text-white/80">🌬️ Wind: {day.windSpeedMax} km/h</p>
            <p className="text-white/80">☀️ UV: {day.uvIndexMax}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default DailyWeather;
