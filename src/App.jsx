import "./App.css";
// import Navbar from "./components/Navbar";
import WeatherDashboard from "./components/WeatherDashboard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      {/* <Navbar /> */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <WeatherDashboard />
      </div>
    </div>
  );
}

export default App;
