import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import pokedexLogo from "../pokedex-logo.png";

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
    <header className="pokedex-header">
      <div className="logo-container">
        <Link to="/">
          <img className="pokedex-logo" src={pokedexLogo} alt="Pokédex Logo" />
        </Link>
        <h1>Pokédex</h1>
      </div>

      <nav className="header__nav-menu">
        <Link to="/">
          <p className="header__home-btn">Home</p>
        </Link>
        <Link to="/favorites">
          <p className="header__favorites-btn">Favorites</p>
        </Link>
        <Link to="/types">
          <p className="header__types-btn">Types</p>
        </Link>
      </nav>

      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
}

export default Header;
