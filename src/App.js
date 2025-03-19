//
import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList/PokemonList";
import axios from "axios";
import Pagination from "./Pagination";
import Header from "./Header/Header";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;

    axios
      .get(currentPageUrl, { signal })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);

        // Fetch details for each Pokémon to get sprites
        const fetchPokemonDetails = res.data.results.map((p) =>
          axios.get(p.url).then((detailsRes) => ({
            name: p.name,
            sprite: detailsRes.data.sprites.front_default,
          }))
        );

        Promise.all(fetchPokemonDetails).then((pokemonData) => {
          setPokemon(pokemonData);
          setFilteredPokemon(pokemonData); // Initialize filtered list
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          console.error("Error fetching Pokémon:", err);
        }
      });

    return () => controller.abort();
  }, [currentPageUrl]);

  // Handle search functionality
  useEffect(() => {
    setFilteredPokemon(
      pokemon.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemon]);

  function goToNextPage() {
    if (nextPageUrl) setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    if (prevPageUrl) setCurrentPageUrl(prevPageUrl);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Header />
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          margin: "10px 0",
          width: "100%",
          fontSize: "16px",
        }}
      />
      <PokemonList pokemon={filteredPokemon} />
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
      />
    </>
  );
}

export default App;
