import React, { useState, useEffect } from "react";
import "./Types.css";
import PokemonList from "../../components/PokemonList/PokemonList";
import { fetchAllPokemonType } from "../../utils/PokeApi";

function Types({ pokemon }) {
  const [selectedType, setSelectedType] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [favorites, setFavorites] = useState("");
  const [allPokemon, setAllPokemon] = useState([]);

  //   useEffect(() => {
  //     console.log("Pokemon data:", pokemon);
  //     console.log(
  //       "Filtered Pokemon:",
  //       filteredPokemon.map((p) => ({
  //         name: p.name,
  //         types: p.types,
  //       }))
  //     );

  useEffect(() => {
    if (!pokemon || !Array.isArray(pokemon)) {
      setFilteredPokemon([]); // Default to an empty array if pokemon is undefined
      return;
    }
    fetchAllPokemonType()
      .then((pokemon) => {
        setAllPokemon(pokemon);
        setFilteredPokemon(pokemon); // Initially show all
      })
      .catch((error) => console.error("Error fetching Pokémon:", error));
  }, []);

  useEffect(() => {
    if (selectedType) {
      const filtered = allPokemon.filter(
        (p) => Array.isArray(p.types) && p.types.includes(selectedType)
      );
      setFilteredPokemon(filtered);
    } else {
      setFilteredPokemon(allPokemon); // Show all if no type is selected
    }
  }, [selectedType, pokemon]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className="types__page">
      <h1>Filter Pokémon by Type</h1>

      {/* Dropdown for selecting a Pokémon type */}
      <select onChange={handleTypeChange} value={selectedType}>
        <option value="">All Types</option>
        <option value="normal">Normal</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="psychic">Psychic</option>
        <option value="fighting">Fighting</option>
        <option value="bug">Bug</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="rock">Rock</option>
        <option value="ice">Ice</option>
        <option value="dragon">Dragon</option>
        <option value="dark">Dark</option>
        <option value="ghost">Ghost</option>
        <option value="steel">Steel</option>
        <option value="fairy">Fairy</option>
        {/* Add more types as needed */}
      </select>

      {/* Render the filtered Pokémon list */}
      <PokemonList pokemon={filteredPokemon} favorites={favorites} />
    </div>
  );
}

export default Types;
