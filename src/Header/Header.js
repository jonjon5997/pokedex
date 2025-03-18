import React from "react";
import "./Header.css";

function Header() {
  return (
    <>
      <header className="pokedex-header">
        {/* Logo & Branding */}
        <div className="logo-container">
          <img src="pokedex-logo.png" alt="Pokédex Logo" />
          <h1>Pokédex</h1>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input type="text" placeholder="Search Pokémon..." />
          <button>🔍</button>
        </div>

        {/* Optional Navigation */}
        <nav className="nav-menu">
          <a href="/">Home</a>
          <a href="/favorites">Favorites</a>
          <a href="/types">Types</a>
        </nav>

        {/* Optional Theme Toggle */}
        <button className="theme-toggle">🌙</button>
      </header>
    </>
  );
}

export default Header;
