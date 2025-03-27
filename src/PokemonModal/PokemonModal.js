// import "./PokemonModal.css";
// import React from "react";

// const PokemonModal = ({ activeModal, handleCloseClick, pokemon }) => {
//   if (!pokemon) return null;

//   return (
//     <div
//       className={`modal ${
//         activeModal === "pokemon-details" ? "modal_opened" : ""
//       }`}
//     >
//       <div className="modal__content">
//         <button
//           onClick={handleCloseClick}
//           type="button"
//           className="modal__close"
//         ></button>
//         <img src={pokemon.sprite} alt={pokemon.name} className="modal__image" />
//         <h2 className="modal__caption">{pokemon.name}</h2>
//       </div>
//     </div>
//   );
// };

// export default PokemonModal;

import "./PokemonModal.css";
import React from "react";
// import PokemonCard from "../PokemonCard/PokemonCard";

const PokemonModal = ({
  activeModal,
  handleCloseClick,
  pokemon,
  handleCardLike,
}) => {
  if (!pokemon) return null;

  return (
    <div
      className={`modal ${
        activeModal === "pokemon-details" ? "modal_opened" : ""
      }`}
    >
      <div className="modal__content">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          Close
        </button>
        <img src={pokemon.sprite} alt={pokemon.name} className="modal__image" />
        <h2 className="modal__caption">{pokemon.name}</h2>
        <p className="modal__types">Types: {pokemon.types.join(", ")}</p>
        <p className="modal__height">Height: {pokemon.height} m</p>
        <p className="modal__weight">Weight: {pokemon.weight} kg</p>
        {/* Render PokemonCard inside the modal */}
        {/* <PokemonCard
          pokemon={pokemon}
          onCardClick={() => {}} // Prevent navigation inside the modal
          handleCardLike={handleCardLike}
        /> */}
      </div>
    </div>
  );
};

export default PokemonModal;
