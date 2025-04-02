export function getItems() {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=10") // Fetch first 10 Pokémon
    .then((res) => res.json())
    .then((data) => {
      return data.results.map((pokemon, index) => ({
        _id: String(index + 1), // Assign unique ID based on index
        title: pokemon.name, // Pokémon name
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`, // Official sprite
      }));
    });
}

export function saveItem(item) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...item, _id: "new-item-id" });
    }, 500);
  });
}
