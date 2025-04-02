import React from "react";
import "./SearchBar.css";

function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
    >
      <form onSubmit={onSearch}>
        <input
          className="search-bar__input"
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-bar__button">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
