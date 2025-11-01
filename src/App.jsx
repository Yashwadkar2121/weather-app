import "./App.css";
import WeatherDashboard from "./components/WeatherDashboard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <WeatherDashboard />
      </div>
    </div>
  );
}

export default App;
