import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; // Correct path to the context
import likeButton from "../../assets/like-button.svg";
import likedButton from "../../assets/liked-button.svg";
import "./PokemonCard.css";

function PokemonCard({ pokemon, onCardClick }) {
  const { favorites, handleCardLike } = useContext(CurrentUserContext);

  // Check if favorites is an array and if the Pokémon is in favorites
  const isLiked =
    Array.isArray(favorites) && favorites.some((fav) => fav.id === pokemon.id);

  if (!pokemon) return null; // Prevent errors if undefined

  const handleCardClick = () => {
    if (onCardClick) onCardClick(pokemon);
  };

  const handleLike = () => {
    handleCardLike(pokemon);
  };
  return (
    <li className="card">
      <h2 className="card__name">{pokemon.name}</h2>
      <img
        className="card__image"
        onClick={handleCardClick}
        src={pokemon?.sprite}
        alt={pokemon?.name}
      />
      <button
        className={`card__like-button ${
          isLiked ? "card__like-button_active" : ""
        }`}
        style={{
          backgroundImage: `url(${isLiked ? likedButton : likeButton})`,
        }}
        onClick={handleLike}
      />
    </li>
  );
}

export default PokemonCard;
