import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
    >
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          width: "400px",
          fontSize: "20px",
          border: "2px solid #ffcc00",
          borderRadius: "8px",
          backgroundColor: "#f8f8f8",
          textAlign: "center",
        }}
      />
    </div>
  );
}

export default SearchBar;
