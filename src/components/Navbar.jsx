import { useState, useEffect } from "react";

function Navbar() {
  const [gradientIndex, setGradientIndex] = useState(0);

  // Gradient color sets
  const gradients = [
    "from-teal-700 via-sky-800 to-blue-900",
    "from-indigo-700 via-purple-700 to-pink-700",
    "from-cyan-700 via-teal-700 to-emerald-700",
    "from-blue-800 via-indigo-800 to-purple-800",
  ];

  // Change every 1 minute
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % gradients.length);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      className={`bg-linear-to-r ${gradients[gradientIndex]} text-white shadow-lg sticky top-0 z-50 backdrop-blur-md transition-all duration-10000 ease-in-out`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex flex-wrap items-center justify-between py-3 sm:py-4">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 sm:h-8 drop-shadow-md"
              alt="Weather Logo"
            />
            <span className="self-center text-xl sm:text-2xl font-semibold whitespace-nowrap text-white">
              WeatherPro
            </span>
          </a>

          {/* Hamburger Button */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg 
                       md:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-colors"
            aria-controls="navbar-menu"
            aria-expanded="false"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Nav Links */}
          <div className="w-full md:flex md:w-auto md:order-1 transition-all duration-300">
            <ul
              className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-white/10 rounded-lg 
                           bg-white/5 backdrop-blur-sm md:space-x-4 lg:space-x-8 rtl:space-x-reverse md:flex-row 
                           md:mt-0 md:border-0 md:bg-transparent"
            >
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block py-2 px-3 md:p-0 rounded-sm text-white/90 hover:text-cyan-200 
                               hover:bg-white/10 md:hover:bg-transparent md:hover:text-cyan-300 transition-colors
                               text-sm sm:text-base"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
