// import axios from "axios";

// const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

// /**
//  * Fetches a list of Pokémon from the API.
//  * @param {string} url - The API URL for pagination.
//  * @returns {Promise<{pokemon: Object[], next: string, prev: string}>}
//  */
// const fetchPokemonList = async (url = BASE_URL) => {
//   try {
//     const res = await axios.get(url);
//     if (!res.data || !res.data.results) {
//       throw new Error("Invalid data received from API");
//     }

//     const pokemonData = await Promise.all(
//       res.data.results.map(async (p) => {
//         const detailsRes = await axios.get(p.url);

//         // Retrieve likes from localStorage (or use an empty array if none exist)
//         const storedLikes =
//           JSON.parse(localStorage.getItem("pokemon_likes")) || [];

//         return {
//           name: p.name,
//           sprite: detailsRes.data.sprites.front_default,
//           types: detailsRes.data.types.map((type) => type.type.name),
//           height: detailsRes.data.height,
//           weight: detailsRes.data.weight,
//           id: p.name, // Use Pokémon name as a unique identifier
//           likes: storedLikes.includes(p.name) ? [p.name] : [], // Add likes array
//         };
//       })
//     );

//     return {
//       pokemon: pokemonData,
//       next: res.data.next,
//       prev: res.data.previous,
//     };
//   } catch (err) {
//     console.error("Error fetching Pokémon:", err);
//     throw new Error("Failed to fetch Pokemon data. Please try again later.");
//   }
// };

// export { fetchPokemonList };

// use built in fetch API instead of axios third party API
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

/**
 * Fetches a list of Pokémon from the API.
 * @param {string} url - The API URL for pagination.
 * @returns {Promise<{pokemon: Object[], next: string, prev: string}>}
 */
const fetchPokemonList = (url = BASE_URL) => {
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json(); // ✅ First .then() only returns res.json()
    })
    .then((data) => {
      if (!data || !data.results) {
        throw new Error("Invalid data received from API");
      }

      return Promise.all(
        data.results.map((p) =>
          fetch(p.url)
            .then((detailsRes) => {
              if (!detailsRes.ok) {
                throw new Error(`Failed to fetch details for ${p.name}`);
              }
              return detailsRes.json(); // ✅ First .then() for detailsRes only returns res.json()
            })
            .then((details) => {
              const storedLikes =
                JSON.parse(localStorage.getItem("pokemon_likes")) || [];

              return {
                name: p.name,
                sprite: details.sprites.front_default,
                types: details.types.map((type) => type.type.name),
                height: details.height,
                weight: details.weight,
                id: p.name,
                likes: storedLikes.includes(p.name) ? [p.name] : [],
              };
            })
        )
      ).then((pokemonData) => ({
        pokemon: pokemonData,
        next: data.next,
        prev: data.previous,
      }));
    });
};

export { fetchPokemonList };
