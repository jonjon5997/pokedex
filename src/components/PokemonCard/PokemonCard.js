// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import likeButton from "../assets/like-button.png";
// import likedButton from "../assets/liked-button.png";
// import { CurrentUserContext } from "../contexts/CurrentUserContext"; // Ensure correct path
// // import api from "../utils/PokeApi";

// function PokemonCard({ pokemon, onCardClick }) {
//   const {
//     user: currentUser,
//     favorites,
//     handleCardLike,
//     id: _id,
//   } = useContext(CurrentUserContext);
//   // const {  } = useContext(CurrentUserContext);

//   const navigate = useNavigate();
//   if (!pokemon) return null; // Prevent errors if undefined

//   const handleCardClick = () => {
//     if (onCardClick) onCardClick(pokemon);
//   };

//   // const isLiked = pokemon?.likes?.some((id) => id === currentUser?._id);
//   // console.log("Pokemon Likes:", pokemon?.likes);
//   const isLiked =
//     Array.isArray(pokemon.likes) && pokemon.likes.includes(currentUser?._id);
//   console.log("Pokemon Likes:", pokemon?.likes || "No likes data available");

//   const handleLike = () => {
//     if (!currentUser) {
//       navigate("/login");
//       return;
//     } else {
//       handleCardLike();
//     }

//     // console.log("Like button clicked for:", pokemon._id); // ✅ Debugging

//     handleCardLike({
//       id: pokemon._id,
//       isLiked: !isLiked,
//     });
//   };

//   // const showLikeButton = currentUser && currentUser.id;

//   // // console.log("Current User:", currentUser);
//   // console.log("Show Like Button:", showLikeButton);

//   return (
//     <li className="card">
//       <h2 className="card__name">{pokemon?.name || "No Name Available"}</h2>
//       <img
//         onClick={handleCardClick}
//         className="card__image"
//         src={pokemon?.sprite || "https://via.placeholder.com/150"}
//         alt={pokemon?.name || "No Image Available"}
//       />

//       {/* {showLikeButton && ( */}
//       <button
//         className={`card__like-button ${
//           isLiked ? "card__like-button_active" : ""
//         }`}
//         style={{
//           backgroundImage: `url(${isLiked ? likedButton : likeButton})`,
//         }}
//         onClick={handleLike}
//       ></button>
//       {/* )} */}
//       {/* {true && ( // Force the button to appear for debugging
//         <button
//           className="card__like-button"
//           onClick={() => console.log("Like button clicked!")}
//         >
//           ❤️
//         </button>
//       )} */}
//     </li>
//   );
// }

// export default PokemonCard;
import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; // Correct path to the context
import likeButton from "../../assets/like-button.png";
import likedButton from "../../assets/liked-button.png";
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
