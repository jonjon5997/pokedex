import "./PokemonList.css";
import React, { useState } from "react";

function PokemonList({ pokemon }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Function to handle sprite click
  const handleSpriteClick = (p) => {
    setSelectedPokemon(p);
  };

  return (
    <div className="pokemon-container">
      {pokemon.length > 0 ? (
        <ul className="pokemon-list">
          {pokemon.map((p) => (
            <li
              key={p.name}
              className="pokemon-item"
              onClick={() => handleSpriteClick(p)}
            >
              <img src={p.sprite} alt={p.name} className="pokemon-sprite" />
              <p className="pokemon-name">{p.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-pokemon">No Pokémon found.</p>
      )}

      {/* Selected Pokémon Modal */}
      {selectedPokemon && (
        <div className="pokemon-modal">
          <h3 className="pokemon-modal-name">{selectedPokemon.name}</h3>
          <img
            src={selectedPokemon.sprite}
            alt={selectedPokemon.name}
            className="pokemon-modal-image"
          />
          <button
            className="pokemon-modal-close"
            onClick={() => setSelectedPokemon(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default PokemonList;
