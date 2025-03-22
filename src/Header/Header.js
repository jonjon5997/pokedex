// import React from "react";
// import "./Header.css";
// import pokedexLogo from "../pokedex-logo.png";

// function Header() {
//   return (
//     <>
//       <header className="pokedex-header">
//         {/* Logo & Branding */}
//         <div className="logo-container">
//           <img className="pokedex-logo" src={pokedexLogo} alt="Pokédex Logo" />
//           <h1>Pokédex</h1>
//         </div>

//         {/* Search Bar */}
//         {/* <div className="search-container">
//           <input type="text" placeholder="Search Pokémon..." />
//           <button>🔍</button>
//         </div> */}

//         {/* Optional Navigation */}
//         <nav className="nav-menu">
//           <a href="/">Home</a>
//           <a href="/favorites">Favorites</a>
//           <a href="/types">Types</a>
//         </nav>

//         {/* Optional Theme Toggle */}
//         <button className="theme-toggle">🌙</button>
//       </header>
//     </>
//   );
// }

// export default Header;

import React, { useState, useEffect } from "react";
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
        <img className="pokedex-logo" src={pokedexLogo} alt="Pokédex Logo" />
        <h1>Pokédex</h1>
      </div>

      <nav className="nav-menu">
        <a href="/">Home</a>
        <a href="/favorites">Favorites</a>
        <a href="/types">Types</a>
      </nav>

      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
}

export default Header;
