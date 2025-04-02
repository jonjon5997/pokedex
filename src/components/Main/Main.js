import "./Main.css";
import PokemonCard from "../PokemonCard/PokemonCard"; // Assuming this is your Pokémon card component
import { useContext } from "react";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AuthContext } from "../../contexts/AuthContext";
import React, { useState } from "react";
import PokemonModal from "../PokemonModal/PokemonModal";
// import PokemonCard from "../PokemonCard/PokemonCard";
import Pagination from "../Pagination/Pagination";

function Main({
  pokemonData,
  filteredPokemon,
  onCardClick,
  handleCardLike,
  currentUser,
  currentPageUrl,
  nextPageUrl,
  prevPageUrl,
  setCurrentPageUrl,
}) {
  const [activeModal, setActiveModal] = useState(null); // Track the active modal
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Store the selected Pokémon for the modal

  // Handle opening and closing the modal
  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setActiveModal("pokemon-details");
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedPokemon(null);
  };

  return (
    <main>
      <section className="pokemon__list">
        {" "}
        {/* Updated section class */}
        {filteredPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onCardClick={() => openModal(pokemon)} // Open modal on card click
            handleCardLike={handleCardLike}
          />
        ))}
      </section>

      {/* Render the modal when activeModal is set */}
      {selectedPokemon && (
        <PokemonModal
          activeModal={activeModal}
          handleCloseClick={closeModal}
          pokemon={selectedPokemon}
          handleCardLike={handleCardLike}
        />
      )}

      {/* Pagination Component */}
      {(nextPageUrl || prevPageUrl) && (
        <Pagination
          goToNextPage={
            nextPageUrl ? () => setCurrentPageUrl(nextPageUrl) : null
          }
          goToPrevPage={
            prevPageUrl ? () => setCurrentPageUrl(prevPageUrl) : null
          }
        />
      )}
    </main>
  );
}

export default Main;
