import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchPokemonList } from "./utils/PokeApi"; // Import API utility
import { DataFetcher } from "./Preloader/Preloader"; // Import the preloader component
import PokemonList from "./PokemonList/PokemonList";
import Pagination from "./Pagination/Pagination";
import Header from "./Header/Header";
import About from "./About/About";
import SearchBar from "./SearchBar/SearchBar";
import Footer from "./Footer/Footer";
import PokemonModal from "./PokemonModal/PokemonModal"; // Import PokemonModal

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Fetch Pokémon data when the page URL changes
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchPokemonList(currentPageUrl)
      .then(({ pokemon, next, prev }) => {
        setPokemon(pokemon);
        setFilteredPokemon(pokemon);
        setNextPageUrl(next);
        setPrevPageUrl(prev);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch Pokémon. Try again later.");
        setLoading(false);
      });
  }, [currentPageUrl]);

  // Filter Pokémon based on the search term
  useEffect(() => {
    setFilteredPokemon(
      pokemon.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemon]);

  // Handle Pokémon card click to show modal
  const handleCardClick = (pokemon) => setSelectedPokemon(pokemon);
  const closeModal = () => setSelectedPokemon(null);

  // Fetch initial Pokémon data
  const fetchData = () => {
    return fetchPokemonList("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => response.pokemon)
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
  };

  return (
    <Router>
      <Header />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {loading ? (
                <DataFetcher fetchData={fetchData} /> // Show preloader while loading
              ) : (
                <>
                  <PokemonList
                    pokemon={filteredPokemon}
                    handleCardClick={handleCardClick}
                  />
                  <Pagination
                    goToNextPage={
                      nextPageUrl ? () => setCurrentPageUrl(nextPageUrl) : null
                    }
                    goToPrevPage={
                      prevPageUrl ? () => setCurrentPageUrl(prevPageUrl) : null
                    }
                  />
                  <Footer />
                </>
              )}
            </>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>

      {/* Show the Pokémon Modal when a Pokémon is selected */}
      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} handleCloseClick={closeModal} />
      )}
    </Router>
  );
}

export default App;
