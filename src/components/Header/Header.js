import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import pokedexLogo from "../../pokedex-logo.png";
import Navigation from "../Navigation/Navigation";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to="/">
          <img
            className="header__pokedex-logo"
            src={pokedexLogo}
            alt="Pokédex Logo"
          />
        </Link>
        <h1>Pokédex</h1>
      </div>
      <Navigation />
      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
}

export default Header;
