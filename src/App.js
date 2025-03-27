// import React, { useState, useEffect, useContext } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { fetchPokemonList } from "./utils/PokeApi"; // Import API utility
// import { DataFetcher } from "./Preloader/Preloader"; // Import the preloader component
// import CurrentUserContext, {
//   CurrentUserProvider,
// } from "./contexts/CurrentUserContext"; // Correct imports

// import PokemonList from "./PokemonList/PokemonList";
// import Pagination from "./Pagination/Pagination";
// import Header from "./Header/Header";
// import About from "./About/About";
// import SearchBar from "./SearchBar/SearchBar";
// import Footer from "./Footer/Footer";
// import PokemonModal from "./PokemonModal/PokemonModal"; // Import PokemonModal
// import FavoritesPage from "./Favorites/Favorites"; // Import FavoritesPage

// function App() {
//   const { favorites, updateFavorites } = useContext(CurrentUserContext); // Use context here

//   const [pokemon, setPokemon] = useState([]);
//   const [filteredPokemon, setFilteredPokemon] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPageUrl, setCurrentPageUrl] = useState(
//     "https://pokeapi.co/api/v2/pokemon/"
//   );
//   const [nextPageUrl, setNextPageUrl] = useState(null);
//   const [prevPageUrl, setPrevPageUrl] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedPokemon, setSelectedPokemon] = useState(null);

//   // Fetch Pokémon data when the page URL changes
//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     fetchPokemonList(currentPageUrl)
//       .then(({ pokemon, next, prev }) => {
//         setPokemon(pokemon);
//         setFilteredPokemon(pokemon);
//         setNextPageUrl(next);
//         setPrevPageUrl(prev);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to fetch Pokémon. Try again later.");
//         setLoading(false);
//       });
//   }, [currentPageUrl]);

//   // Filter Pokémon based on the search term
//   useEffect(() => {
//     setFilteredPokemon(
//       pokemon.filter((p) =>
//         p.name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [searchTerm, pokemon]);

//   // Handle Pokémon card click to show modal
//   const handleCardClick = (pokemon) => setSelectedPokemon(pokemon);
//   const closeModal = () => setSelectedPokemon(null);

//   // Fetch initial Pokémon data
//   const fetchData = () => {
//     return fetchPokemonList("https://pokeapi.co/api/v2/pokemon/")
//       .then((response) => response.pokemon)
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         throw error;
//       });
//   };

//   return (
//     <CurrentUserProvider value={{ favorites, updateFavorites }}>
//       <Router>
//         <Header />
//         <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 {error && <p style={{ color: "red" }}>{error}</p>}
//                 {loading ? (
//                   <DataFetcher fetchData={fetchData} /> // Show preloader while loading
//                 ) : (
//                   <>
//                     <PokemonList
//                       pokemon={filteredPokemon}
//                       handleCardClick={handleCardClick}
//                     />
//                     <Pagination
//                       goToNextPage={
//                         nextPageUrl
//                           ? () => setCurrentPageUrl(nextPageUrl)
//                           : null
//                       }
//                       goToPrevPage={
//                         prevPageUrl
//                           ? () => setCurrentPageUrl(prevPageUrl)
//                           : null
//                       }
//                     />
//                     <Footer />
//                   </>
//                 )}
//               </>
//             }
//           />
//           <Route path="/about" element={<About />} />
//           <Route path="/favorites" element={<FavoritesPage />} />{" "}
//           {/* New route for Favorites Page */}
//         </Routes>

//         {/* Show the Pokémon Modal when a Pokémon is selected */}
//         {selectedPokemon && (
//           <PokemonModal
//             pokemon={selectedPokemon}
//             handleCloseClick={closeModal}
//           />
//         )}
//       </Router>
//     </CurrentUserProvider>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { fetchPokemonList } from "./utils/PokeApi"; // Import API utility
// import { DataFetcher } from "./Preloader/Preloader"; // Import the preloader component
// import {
//   CurrentUserProvider,
//   CurrentUserContext,
// } from "./contexts/CurrentUserContext.js"; // Named import

// import PokemonList from "./PokemonList/PokemonList";
// import Pagination from "./Pagination/Pagination";
// import Header from "./Header/Header";
// import About from "./About/About";
// import SearchBar from "./SearchBar/SearchBar";
// import Footer from "./Footer/Footer";
// import PokemonModal from "./PokemonModal/PokemonModal"; // Import PokemonModal
// import Favorites from "./Favorites/Favorites"; // Import FavoritesPage
// import Login from "./Login/Login"; // Import Login
// import Register from "./Register/Register"; // Import Register

// function App() {
//   const [pokemon, setPokemon] = useState([]);
//   const [filteredPokemon, setFilteredPokemon] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPageUrl, setCurrentPageUrl] = useState(
//     "https://pokeapi.co/api/v2/pokemon/"
//   );
//   const [nextPageUrl, setNextPageUrl] = useState(null);
//   const [prevPageUrl, setPrevPageUrl] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedPokemon, setSelectedPokemon] = useState(null);

//   // Fetch Pokémon data when the page URL changes
//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     fetchPokemonList(currentPageUrl)
//       .then(({ pokemon, next, prev }) => {
//         setPokemon(pokemon);
//         setFilteredPokemon(pokemon);
//         setNextPageUrl(next);
//         setPrevPageUrl(prev);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to fetch Pokémon. Try again later.");
//         setLoading(false);
//       });
//   }, [currentPageUrl]);

//   // Filter Pokémon based on the search term
//   useEffect(() => {
//     setFilteredPokemon(
//       pokemon.filter((p) =>
//         p.name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [searchTerm, pokemon]);

//   // Handle Pokémon card click to show modal
//   const handleCardClick = (pokemon) => setSelectedPokemon(pokemon);
//   const closeModal = () => setSelectedPokemon(null);

//   // Fetch initial Pokémon data
//   const fetchData = () => {
//     return fetchPokemonList("https://pokeapi.co/api/v2/pokemon/")
//       .then((response) => response.pokemon)
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         throw error;
//       });
//   };

//   return (
//     <CurrentUserProvider>
//       {" "}
//       {/* Wrap the app with the provider */}
//       <Router>
//         <Header />
//         <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 {error && <p style={{ color: "red" }}>{error}</p>}
//                 {loading ? (
//                   <DataFetcher fetchData={fetchData} /> // Show preloader while loading
//                 ) : (
//                   <>
//                     <PokemonList
//                       pokemon={filteredPokemon}
//                       handleCardClick={handleCardClick}
//                       handleCardLike={() => {}}
//                     />
//                     <Pagination
//                       goToNextPage={
//                         nextPageUrl
//                           ? () => setCurrentPageUrl(nextPageUrl)
//                           : null
//                       }
//                       goToPrevPage={
//                         prevPageUrl
//                           ? () => setCurrentPageUrl(prevPageUrl)
//                           : null
//                       }
//                     />
//                     <Footer />
//                   </>
//                 )}
//               </>
//             }
//           />
//           <Route path="/about" element={<About />} />
//           <Route path="/favorites" element={<Favorites />} />
//           <Route path="/login" element={<Login />} /> {/* Add Login route */}
//           <Route path="/register" element={<Register />} />{" "}
//           {/* Add Register route */}
//         </Routes>

//         {/* Show the Pokémon Modal when a Pokémon is selected */}
//         {selectedPokemon && (
//           <PokemonModal
//             pokemon={selectedPokemon}
//             handleCloseClick={closeModal}
//           />
//         )}
//       </Router>
//     </CurrentUserProvider>
//   );
// }

// export default App;

import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
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
// import { getItems } from "./utils/api";

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
  const [favorites, setFavorites] = useState([]); // Stores liked Pokémon

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

  // Function to handle liking/unliking a Pokémon
  const handleCardLike = ({ id, isLiked }) => {
    setFavorites((prevFavorites) => {
      if (isLiked) {
        return [...prevFavorites, id]; // Add Pokémon to favorites
      } else {
        return prevFavorites.filter((favId) => favId !== id); // Remove Pokémon from favorites
      }
    });
  };

  // Handle Pokémon card click to show modal
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
                        handleCardLike={handleCardLike} // ✅ Pass the function to PokemonList
                        favorites={favorites} // ✅ Pass the favorites state
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
          {/* Show the Pokémon Modal when a Pokémon is selected */}
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

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return user ? children : <Navigate to="/login" />;
};

export default App;
