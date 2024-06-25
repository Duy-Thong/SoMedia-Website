import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Ensure this is imported
import { WiMoonAltWaningCrescent4 } from "react-icons/wi";

const Themetoggle = () => {
  const location = useLocation(); // Use useLocation to get the current path

  // Set initial theme based on location
  const initialTheme = location.pathname === '/' ? 'dark' : (localStorage.getItem("theme") || "light");
  const [theme, setTheme] = useState(initialTheme);

  const themeToggle = () => {
    if (location.pathname !== '/') { // Prevent theme toggling on the home page
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (location.pathname !== '/') { // Only save theme preference if not on the home page
      localStorage.setItem('theme', theme);
    }
  }, [theme, location.pathname]);

  return (
    <div className="nav_ac" onClick={themeToggle}>
      <WiMoonAltWaningCrescent4 />
    </div>
  );
};

export default Themetoggle;
