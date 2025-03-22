import "./PokemonModal.css";
import React from "react";

const PokemonModal = ({ activeModal, handleCloseClick, pokemon }) => {
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
        ></button>
        <img src={pokemon.sprite} alt={pokemon.name} className="modal__image" />
        <h2 className="modal__caption">{pokemon.name}</h2>
      </div>
    </div>
  );
};

export default PokemonModal;
