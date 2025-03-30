import React, { useState, useEffect, useContext } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { fetchPokemonList, fetchAllPokemon } from "../../utils/PokeApi";
import { DataFetcher } from "../Preloader/Preloader";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import PokemonList from "../PokemonList/PokemonList";
import Pagination from "../Pagination/Pagination";
import Header from "../Header/Header";
import About from "../About/About";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";
import PokemonModal from "../PokemonModal/PokemonModal";
import Favorites from "../Favorites/Favorites";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { AuthProvider, AuthContext } from "../../contexts/AuthContext";
import "./App.css";

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
  const [allPokemon, setAllPokemon] = useState([]);

  // const { favorites, handleCardLike } = useAuth();

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
    fetchAllPokemon()
      .then((names) => setAllPokemon(names))
      .catch(() => setError("Failed to fetch Pokémon names."));
  }, []);

  useEffect(() => {
    setFilteredPokemon(
      pokemon.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemon]);

  // Load liked Pokémon from localStorage on component mount
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (!searchTerm) {
      // If no search term, show current page Pokemon
      setFilteredPokemon(pokemon);
      return;
    }

    // Filter from all Pokemon names
    const matchingPokemon = allPokemon.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // If we have matches, fetch their details
    if (matchingPokemon.length > 0) {
      setLoading(true);
      // Create an array of promises for each matching Pokemon
      const fetchPromises = matchingPokemon.map(async (name) => {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          );
          const data = await response.json();
          return {
            name: data.name,
            sprite: data.sprites.front_default,
            types: data.types.map((type) => type.type.name),
            height: data.height,
            weight: data.weight,
            id: data.name,
          };
        } catch (error) {
          console.error(`Error fetching ${name}:`, error);
          return null;
        }
      });

      // Wait for all Pokemon data to be fetched
      Promise.all(fetchPromises)
        .then((results) => {
          const validResults = results.filter((result) => result !== null);
          setFilteredPokemon(validResults);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching Pokemon details:", error);
          setLoading(false);
          setError("Failed to fetch Pokemon details");
        });
    } else {
      setFilteredPokemon([]);
    }
  }, [searchTerm, allPokemon]);

  const handleCardLike = ({ id, isLiked }) => {
    setFavorites((prevFavorites) => {
      if (isLiked) {
        return [...prevFavorites, id];
      } else {
        return prevFavorites.filter((favId) => favId !== id);
      }
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    console.log("Searching for:", searchTerm); // For debugging, remove later

    // You already have a useEffect handling filtering, so no need to set state here.
  };

  const handleCardClick = (pokemon) => setSelectedPokemon(pokemon);
  const closeModal = () => setSelectedPokemon(null);

  // const filteredResults = allPokemon.filter((name) =>
  //   name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const displayedPokemon = pokemon.filter((p) =>
  //   filteredResults.includes(p.name)
  // );

  return (
    <AuthProvider>
      <CurrentUserProvider>
        <div className="page__content">
          <Router>
            <Header />
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearchSubmit}
            />
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
                          // pokemon={filteredPokemon}
                          // pokemon={
                          //   displayedPokemon.length ? displayedPokemon : pokemon
                          // }
                          pokemon={searchTerm ? filteredPokemon : pokemon}
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
        </div>
      </CurrentUserProvider>
    </AuthProvider>
  );
}

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

export default App;
