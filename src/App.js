import React, { useState, useEffect, useContext } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { fetchPokemonList } from "./utils/PokeApi";
import { DataFetcher } from "./Preloader/Preloader";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import PokemonList from "./PokemonList/PokemonList";
import Pagination from "./Pagination/Pagination";
import Header from "./Header/Header";
import About from "./About/About";
import SearchBar from "./SearchBar/SearchBar";
import Footer from "./Footer/Footer";
import PokemonModal from "./PokemonModal/PokemonModal";
import Favorites from "./Favorites/Favorites";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";

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
  const [favorites, setFavorites] = useState([]);

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

  useEffect(() => {
    setFilteredPokemon(
      pokemon.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemon]);

  const handleCardLike = ({ id, isLiked }) => {
    setFavorites((prevFavorites) => {
      if (isLiked) {
        return [...prevFavorites, id];
      } else {
        return prevFavorites.filter((favId) => favId !== id);
      }
    });
  };

  const handleCardClick = (pokemon) => setSelectedPokemon(pokemon);
  const closeModal = () => setSelectedPokemon(null);

  return (
    <AuthProvider>
      <CurrentUserProvider>
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
                    <DataFetcher
                      fetchData={() => fetchPokemonList(currentPageUrl)}
                    />
                  ) : (
                    <>
                      <PokemonList
                        pokemon={filteredPokemon}
                        handleCardClick={handleCardClick}
                        handleCardLike={handleCardLike}
                        favorites={favorites}
                      />
                      <Pagination
                        goToNextPage={
                          nextPageUrl
                            ? () => setCurrentPageUrl(nextPageUrl)
                            : null
                        }
                        goToPrevPage={
                          prevPageUrl
                            ? () => setCurrentPageUrl(prevPageUrl)
                            : null
                        }
                      />
                    </>
                  )}
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
          {selectedPokemon && (
            <PokemonModal
              pokemon={selectedPokemon}
              handleCloseClick={closeModal}
              handleCardLike={handleCardLike}
            />
          )}
        </Router>
      </CurrentUserProvider>
    </AuthProvider>
  );
}

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

export default App;
