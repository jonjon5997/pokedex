import { useState, useEffect } from "react";

function Preloader() {
  return (
    <>
      <div className="circle-preloader">Searching for text...</div>
    </>
  );
}

export function DataFetcher({ fetchData }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3); // For the "Show More" functionality

  useEffect(() => {
    setIsLoading(true);
    fetchData()
      .then((response) => {
        // Make sure response is an array
        if (Array.isArray(response)) {
          setData(response);
        } else {
          setData([]); // If it's not an array, set an empty array
        }
        setError(null);
      })
      .catch(() => {
        setError(
          "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fetchData]);

  if (isLoading) return <Preloader />;
  if (error) return <div className="error-message">{error}</div>;
  if (data.length === 0) return <div className="no-results">Nothing found</div>;

  // Handle the "Show More" functionality
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div>
      {data.slice(0, visibleCount).map((pokemon, index) => (
        <div key={index} className="result-item">
          {/* Accessing the individual properties of the Pokémon object */}
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprite} alt={pokemon.name} />
          <p>Types: {pokemon.types.join(", ")}</p>
          <p>Height: {pokemon.height} m</p>
          <p>Weight: {pokemon.weight} kg</p>
        </div>
      ))}
      {visibleCount < data.length && (
        <button onClick={handleShowMore} className="show-more-button">
          Show More
        </button>
      )}
    </div>
  );
}
