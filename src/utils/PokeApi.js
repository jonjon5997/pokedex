// use built in fetch API instead of axios third party API
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

/**
 * Fetches a list of Pokémon from the API.
 * @param {string} url - The API URL for pagination.
 * @returns {Promise<{pokemon: Object[], next: string, prev: string}>}
 */

const fetchAllPokemonType = () => {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) =>
      Promise.all(
        data.results.map((p) =>
          fetch(p.url)
            .then((detailsRes) => {
              if (!detailsRes.ok) {
                console.error(`Failed to fetch details for ${p.name}`);
                return null; // Skip this Pokémon if it fails
              }
              return detailsRes.json();
            })
            .then((details) => {
              if (!details) return null; // Skip invalid data
              return {
                id: details.id,
                name: p.name,
                sprite: details.sprites.front_default,
                types: details.types.map((type) => type.type.name),
              };
            })
        )
      )
    )
    .then((pokemonData) => pokemonData.filter((p) => p != null)); // Filter out null entries
};

const fetchAllPokemon = () => {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=1000") // Adjust the limit as needed
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json(); // First .then() returns res.json() ✅
    })
    .then((data) => data.results.map((p) => p.name)); // Extract only names
};

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

export { fetchPokemonList, fetchAllPokemon, fetchAllPokemonType };
