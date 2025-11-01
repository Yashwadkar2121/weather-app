# 🌦️ Weather App

A modern, responsive weather forecast dashboard built with **React**, **Vite**, and **Tailwind CSS**.  
Provides real-time weather conditions, hourly updates, and a 7-day forecast for any city worldwide.

---

## 🚀 Features

- 🌍 **Search any city** and retrieve live weather data (via Open-Meteo APIs)
- 🌤 **Current weather** (temperature, humidity, wind, rain, pressure, etc.)
- 🕒 **Hourly forecast** — next 6 hours in compact view, full 24-hour detail in expanded mode
- 📅 **Daily forecast** — clean 7-day overview
- 🎨 **Animated gradients** and **smooth transitions** (using Framer Motion)
- 📱 **Fully responsive** — works seamlessly on mobile, tablet, and desktop
- ⚡ **Optimized performance** with Vite for blazing-fast builds
- 💡 **Modern UI** with Tailwind CSS for styling consistency

---

## 🛠️ Tech Stack

- ⚛️ **React** (functional components, hooks)
- ⚡ **Vite** (development bundler)
- 💅 **Tailwind CSS** (utility-first styling)
- 🎞 **Framer Motion** (animations & transitions)
- 🌐 **Open-Meteo APIs** (weather & geocoding)
- ☁️ **Vercel** (deployment)

---

## 📁 Project Structure
   ```bash
weather-app/
├── public/
| └── vite.svg
├── src/
| ├──assets/
│ |└── react.svg
│ ├── components/
│ │ ├── WeatherComponents/
│ │ │ ├── CurrentWeather.jsx
│ │ │ ├── HourlyWeather.jsx
│ │ │ └── DailyWeather.jsx
│ │ └── WeatherDashboard.jsx
│ ├── App.css
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🧩 Installation & Setup

1. **Clone this repository**
   ``` bash
   git clone https://github.com/Yashwadkar2121/weather-app.git
   cd weather-app
   ```
2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
---
🔧 Usage
-  Enter a city name (e.g., London, New York, Tokyo) in the search bar.

- Click Get Weather to fetch data from the Open-Meteo API.

- View three forecast cards:

- Current → real-time weather conditions

- Hourly → short-term hourly forecast

- Daily → week-long outlook

- Click any card to expand into full-screen detailed view.

- Press ✕ to close the detailed view and return to the dashboard.

---

📊 API & Data Sources
- Geocoding:
https://geocoding-api.open-meteo.com/v1/search

- Weather Forecast:
https://api.open-meteo.com/v1/forecast

- Data retrieved includes:
**temperature_2m, relative_humidity_2m, wind_speed_10m, weather_code**, and more.
Always handle edge cases (e.g., city not found, missing data, network errors).

---
🧑‍💻 Contributing
Contributions are welcome! 🎉

1. Fork this repository

2. Create a feature branch
```bash
git checkout -b feature/my-new-feature
```
3. Make your changes and verify with
```bash
npm run dev
```
4. Submit a Pull Request with a clear description of your changes
Your PR will be reviewed and merged after approval 🚀
