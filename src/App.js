// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import PokemonList from "./PokemonList/PokemonList";
// import axios from "axios";
// import Pagination from "./Pagination/Pagination";
// import Header from "./Header/Header";
// import PokemonModal from "./PokemonModal/PokemonModal";
// import About from "./About/About"; // Import About page
// import SearchBar from "./SearchBar/SearchBar"; // Import the search bar
// import Footer from "./Footer/Footer";

// function App() {
//   const [pokemon, setPokemon] = useState([]);
//   const [filteredPokemon, setFilteredPokemon] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPageUrl, setCurrentPageUrl] = useState(
//     "https://pokeapi.co/api/v2/pokemon/"
//   );
//   const [nextPageUrl, setNextPageUrl] = useState();
//   const [prevPageUrl, setPrevPageUrl] = useState();
//   const [loading, setLoading] = useState(true);
//   const [activeModal, setActiveModal] = useState(null);
//   const [selectedPokemon, setSelectedPokemon] = useState(null);

//   useEffect(() => {
//     if (!activeModal) return;

//     const handleEscClose = (e) => {
//       if (e.key === "Escape") {
//         closeActiveModal();
//       }
//     };

//     document.addEventListener("keydown", handleEscClose);
//     return () => {
//       document.removeEventListener("keydown", handleEscClose);
//     };
//   }, [activeModal]);

//   useEffect(() => {
//     setLoading(true);
//     const controller = new AbortController();
//     const signal = controller.signal;

//     axios
//       .get(currentPageUrl, { signal })
//       .then((res) => {
//         setLoading(false);
//         setNextPageUrl(res.data.next);
//         setPrevPageUrl(res.data.previous);

//         const fetchPokemonDetails = res.data.results.map((p) =>
//           axios.get(p.url).then((detailsRes) => ({
//             name: p.name,
//             sprite: detailsRes.data.sprites.front_default,
//           }))
//         );

//         Promise.all(fetchPokemonDetails).then((pokemonData) => {
//           setPokemon(pokemonData);
//           setFilteredPokemon(pokemonData);
//         });
//       })
//       .catch((err) => {
//         if (axios.isCancel(err)) {
//           console.log("Request canceled:", err.message);
//         } else {
//           console.error("Error fetching Pokémon:", err);
//         }
//       });

//     return () => controller.abort();
//   }, [currentPageUrl]);

//   useEffect(() => {
//     setFilteredPokemon(
//       pokemon.filter((p) =>
//         p.name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [searchTerm, pokemon]);

//   function goToNextPage() {
//     if (nextPageUrl) setCurrentPageUrl(nextPageUrl);
//   }

//   function goToPrevPage() {
//     if (prevPageUrl) setCurrentPageUrl(prevPageUrl);
//   }

//   const closeActiveModal = () => {
//     setActiveModal(null);
//     setSelectedPokemon(null);
//   };

//   const handleCardClick = (pokemon) => {
//     setSelectedPokemon(pokemon);
//     setActiveModal("pokemon-details");
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <Router>
//       <Header />
//       <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       <Routes>
//         {/* Main Pokédex Route */}
//         <Route
//           path="/"
//           element={
//             <>
//               {/* <input
//                 type="text"
//                 placeholder="Search Pokémon..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{
//                   padding: "8px",
//                   margin: "10px 0",
//                   width: "400px",
//                   fontSize: "16px",
//                   border: "2px solid #ffcc00", // Example border
//                   borderRadius: "8px", // Rounded corners
//                   position: "relative",
//                   backgroundColor: "#f8f8f8",
//                   justifyContent: "center",
//                   display: "flex",
//                   alignItems: "center",
//                   background: "transparent",
//                 }}
//               /> */}
//               <PokemonList
//                 pokemon={filteredPokemon}
//                 handleCardClick={handleCardClick}
//               />
//               <Pagination
//                 goToNextPage={nextPageUrl ? goToNextPage : null}
//                 goToPrevPage={prevPageUrl ? goToPrevPage : null}
//               />
//               <Footer />
//               {activeModal === "pokemon-details" && selectedPokemon && (
//                 <PokemonModal
//                   activeModal={activeModal}
//                   handleCloseClick={closeActiveModal}
//                   pokemon={selectedPokemon}
//                 />
//               )}
//             </>
//           }
//         />
//         {/* About Route */}
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchPokemonList } from "./utils/PokeApi"; // Import API utility
import PokemonList from "./PokemonList/PokemonList";
import Pagination from "./Pagination/Pagination";
import Header from "./Header/Header";
import PokemonModal from "./PokemonModal/PokemonModal";
import About from "./About/About";
import SearchBar from "./SearchBar/SearchBar";
import Footer from "./Footer/Footer";

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

  const handleCardClick = (pokemon) => setSelectedPokemon(pokemon);
  const closeModal = () => setSelectedPokemon(null);

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
                <p>Loading...</p>
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
              {selectedPokemon && (
                <PokemonModal
                  pokemon={selectedPokemon}
                  handleCloseClick={closeModal}
                />
              )}
            </>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
