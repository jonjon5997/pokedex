import { useState, useEffect } from "react";

function Preloader() {
  return (
    <>
      <div className="circle-preloader">Searching for text...</div>
    </>
  );
}
function Results({ data }) {
  const [visibleCount, setVisibleCount] = useState(3);
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };
  return (
    <div>
      {data.slice(0, visibleCount).map((item, index) => (
        <div key={index} className="result-item">
          {/* Accessing the individual properties of the Pokémon object */}
          <h2>{item.name}</h2>
          <img src={item.sprite} alt={item.name} />
          <p>Types: {item.types.join(", ")}</p>
          <p>Height: {item.height} m</p>
          <p>Weight: {item.weight} kg</p>
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

export function DataFetcher({ fetchData }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchData()
      .then((response) => {
        if (response.length === 0) {
          setData([]);
        } else {
          setData(response);
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

  return <Results data={data} />;
}
