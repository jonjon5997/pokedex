import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import likeButton from "../assets/like-button.png";
import likedButton from "../assets/liked-button.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext"; // Ensure correct path

function PokemonCard({ pokemon, onCardClick, handleCardLike }) {
  console.log("Pokemon Image URL:", pokemon?.sprite);

  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  if (!pokemon) return null; // Prevent errors if undefined

  const handleCardClick = () => {
    if (onCardClick) onCardClick(pokemon);
  };

  const isLiked = pokemon?.likes?.some((id) => id === currentUser?._id);
  console.log("Pokemon Likes:", pokemon?.likes);

  const handleLike = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    console.log("Like button clicked for:", pokemon._id); // ✅ Debugging

    handleCardLike({
      id: pokemon._id,
      isLiked: !isLiked,
    });
  };

  const showLikeButton = currentUser && currentUser._id;

  console.log("Current User:", currentUser);
  console.log("Show Like Button:", showLikeButton);

  return (
    <li className="card">
      <h2 className="card__name">{pokemon?.name || "No Name Available"}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={pokemon?.sprite || "https://via.placeholder.com/150"}
        alt={pokemon?.name || "No Image Available"}
      />

      {showLikeButton && (
        <button
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
          style={{
            backgroundImage: `url(${isLiked ? likedButton : likeButton})`,
          }}
          onClick={handleLike}
        ></button>
      )}
      {/* {true && ( // Force the button to appear for debugging
        <button
          className="card__like-button"
          onClick={() => console.log("Like button clicked!")}
        >
          ❤️
        </button>
      )} */}
    </li>
  );
}

export default PokemonCard;
