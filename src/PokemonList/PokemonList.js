// import "./PokemonList.css";
// import React, { useState } from "react";
// import PokemonModal from "../PokemonModal/PokemonModal";

// function PokemonList({ pokemon }) {
//   const [selectedPokemon, setSelectedPokemon] = useState(null);

//   // Function to handle sprite click
//   const handleSpriteClick = (p) => {
//     setSelectedPokemon(p);
//   };

//   // Function to handle modal close
//   const handleCloseModal = () => {
//     setSelectedPokemon(null);
//   };

//   return (
//     <div className="pokemon-container">
//       {pokemon.length > 0 ? (
//         <ul className="pokemon-list">
//           {pokemon.map((p) => (
//             <li
//               key={p.name}
//               className="pokemon-item"
//               onClick={() => handleSpriteClick(p)}
//             >
//               <img src={p.sprite} alt={p.name} className="pokemon-sprite" />
//               <p className="pokemon-name">{p.name}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="no-pokemon">No Pokémon found.</p>
//       )}

//       {/* Pass selectedPokemon and handleCloseModal to PokemonModal */}
//       <PokemonModal
//         activeModal={selectedPokemon ? "pokemon-details" : ""}
//         handleCloseClick={handleCloseModal}
//         pokemon={selectedPokemon}
//       />
//     </div>
//   );
// }

// export default PokemonList;

import "./PokemonList.css";
import React, { useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard"; // Import PokemonCard component
import PokemonModal from "../PokemonModal/PokemonModal";

function PokemonList({ pokemon, handleCardLike, favorites }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Function to handle sprite click
  const handleSpriteClick = (p) => {
    setSelectedPokemon(p);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="pokemon-container">
      {pokemon.length > 0 ? (
        <ul className="pokemon-list">
          {pokemon.map((p) => (
            <PokemonCard
              key={p.name}
              pokemon={p}
              onCardClick={handleSpriteClick}
              handleCardLike={handleCardLike}
              isLiked={favorites.includes(p.name)} // ✅ Pass like status to PokemonCard
            />
          ))}
        </ul>
      ) : (
        <p className="no-pokemon">No Pokémon found.</p>
      )}

      {/* Pass selectedPokemon and handleCloseModal to PokemonModal */}
      <PokemonModal
        activeModal={selectedPokemon ? "pokemon-details" : ""}
        handleCloseClick={handleCloseModal}
        pokemon={selectedPokemon}
      />
    </div>
  );
}

export default PokemonList;
