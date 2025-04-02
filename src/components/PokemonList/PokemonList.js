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
    <div className="pokemon__container">
      {pokemon.length > 0 ? (
        <ul className="pokemon__list">
          {pokemon.map((p) => (
            <PokemonCard
              key={p.name || p.id}
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
