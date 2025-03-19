// import React from "react";
// import "./PokemonList.css"; // Import CSS file for styling

// function PokemonList({ pokemon }) {
//   return (
//     <div className="pokemon-list">
//       {pokemon.map((p) => (
//         <div key={p.name} className="pokemon-item">
//           <img src={p.sprite} alt={p.name} className="pokemon-sprite" />
//           <span className="pokemon-name">{p.name}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default PokemonList;

import React from "react";

function PokemonList({ pokemon }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {pokemon.length > 0 ? (
        pokemon.map((p) => (
          <div
            key={p.name}
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              background: "#f9f9f9",
            }}
          >
            <img
              src={p.sprite}
              alt={p.name}
              style={{ width: "50px", marginRight: "10px" }}
            />
            <p style={{ textTransform: "capitalize" }}>{p.name}</p>
          </div>
        ))
      ) : (
        <p>No Pokémon found.</p>
      )}
    </div>
  );
}

export default PokemonList;
