// import React, { useState, useEffect } from "react";
// import PokemonList from "./PokemonList";
// import axios from "axios";
// import Pagination from "./Pagination";

// function App() {
//   const [pokemon, setPokemon] = useState([]);
//   const [currentPageUrl, setCurrentPageUrl] = useState(
//     "https://pokeapi.co/api/v2/pokemon/"
//   );
//   const [nextPageUrl, setNextPageUrl] = useState();
//   const [prevPageUrl, setPrevPageUrl] = useState();
//   const [loading, setLoading] = useState(true);

//   // useEffect accepts a function that will be rendered after every execution
//   useEffect(() => {
//     setLoading(true);
//     let cancel;
//     axios
//       .get(currentPageUrl, {
//         cancelToken: new axios.CancelToken((c) => (cancel = c)),
//       })
//       .then((res) => {
//         setLoading(false);
//         setNextPageUrl(res.data.next);
//         setPrevPageUrl(res.data.previous);
//         setPokemon(res.data.results.map((p) => p.name));
//       });
//     return () => cancel();
//   }, [currentPageUrl]);

//   function goToNextPage() {
//     setCurrentPageUrl(nextPageUrl);
//   }

//   function goToPrevPage() {
//     setCurrentPageUrl(prevPageUrl);
//   }

//   if (loading) return "Loading...";

//   return;
//   <>
//     <PokemonList pokemon={pokemon} />
//     <Pagination goToNextPage={goToNextPage} goToPrevPage={goToPrevPage} />
//   </>;
// }

// export default App;

import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
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

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController(); // Create an instance of AbortController
    const signal = controller.signal;

    axios
      .get(currentPageUrl, { signal }) // Use signal instead of cancelToken
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Request canceled:", err.message);
        } else {
          console.error("Error fetching Pokémon:", err);
        }
      });

    return () => {
      controller.abort(); // Cleanup: cancel the request when component unmounts
    };
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
