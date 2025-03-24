// src/components/FavoritesPage/FavoritesPage.js
import React, { useContext } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"; // Correct relative path

function Favorites() {
  const { favorites } = useContext(CurrentUserContext);

  return (
    <div className="favorites-container">
      <h1>Your Favorite Pokémon</h1>
      {favorites.length > 0 ? (
        <ul className="favorites-list">
          {favorites.map((pokemon) => (
            <PokemonCard key={pokemon._id} PokemonModal={pokemon} />
          ))}
        </ul>
      ) : (
        <p>No favorites yet!</p>
      )}
    </div>
  );
}

export default Favorites;
