import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

/**
 * Fetches a list of Pokémon from the API.
 * @param {string} url - The API URL for pagination.
 * @returns {Promise<{pokemon: Object[], next: string, prev: string}>}
 */
const fetchPokemonList = async (url = BASE_URL) => {
  try {
    const res = await axios.get(url);
    if (!res.data || !res.data.results) {
      throw new Error("Invalid data received from API");
    }

    const pokemonData = await Promise.all(
      res.data.results.map(async (p) => {
        const detailsRes = await axios.get(p.url);

        // Retrieve likes from localStorage (or use an empty array if none exist)
        const storedLikes =
          JSON.parse(localStorage.getItem("pokemon_likes")) || [];

        return {
          name: p.name,
          sprite: detailsRes.data.sprites.front_default,
          types: detailsRes.data.types.map((type) => type.type.name),
          height: detailsRes.data.height,
          weight: detailsRes.data.weight,
          id: p.name, // Use Pokémon name as a unique identifier
          likes: storedLikes.includes(p.name) ? [p.name] : [], // Add likes array
        };
      })
    );

    return {
      pokemon: pokemonData,
      next: res.data.next,
      prev: res.data.previous,
    };
  } catch (err) {
    console.error("Error fetching Pokémon:", err);
    throw new Error("Failed to fetch Pokemon data. Please try again later.");
  }
};

export { fetchPokemonList };
