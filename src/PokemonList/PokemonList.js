// import React from "react";

// export default function PokemonList({ pokemon }) {
//   return (
//     <div>
//       {pokemon.map((p) => (
//         <div key={p}>{p}</div>
//       ))}
//     </div>
//   );
// }

import React from "react";
import "./PokemonList.css"; // Import CSS file for styling

function PokemonList({ pokemon }) {
  return (
    <div className="pokemon-list">
      {pokemon.map((p) => (
        <div key={p.name} className="pokemon-item">
          <img src={p.sprite} alt={p.name} className="pokemon-sprite" />
          <span className="pokemon-name">{p.name}</span>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
