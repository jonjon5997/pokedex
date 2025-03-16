import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList/PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(true);
  //   const controller = new AbortController(); // Create an instance of AbortController
  //   const signal = controller.signal;

  //   axios
  //     .get(currentPageUrl, { signal }) // Use signal instead of cancelToken
  //     .then((res) => {
  //       setLoading(false);
  //       setNextPageUrl(res.data.next);
  //       setPrevPageUrl(res.data.previous);
  //       setPokemon(res.data.results.map((p) => p.name));
  //     })
  //     .catch((err) => {
  //       if (axios.isCancel(err)) {
  //         console.log("Request canceled:", err.message);
  //       } else {
  //         console.error("Error fetching Pokémon:", err);
  //       }
  //     });

  //   return () => {
  //     controller.abort(); // Cleanup: cancel the request when component unmounts
  //   };
  // }, [currentPageUrl]);

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
            sprite: detailsRes.data.sprites.front_default, // Fetch sprite URL
          }))
        );

        Promise.all(fetchPokemonDetails).then(setPokemon);
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

  function goToNextPage() {
    if (nextPageUrl) setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    if (prevPageUrl) setCurrentPageUrl(prevPageUrl);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
      />
    </>
  );
}

export default App;
