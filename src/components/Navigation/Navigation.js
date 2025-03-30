import { Link } from "react-router-dom";
import React from "react";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="nav__menu">
      <Link to="/">
        <p className="nav__home-btn">Home</p>
      </Link>
      <Link to="/favorites">
        <p className="nav__favorites-btn">Favorites</p>
      </Link>
      <Link to="/types">
        <p className="nav__types-btn">Types</p>
      </Link>
    </nav>
  );
}

export default Navigation;
