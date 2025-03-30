// import React from "react";

// function SearchBar({ searchTerm, setSearchTerm }) {
//   return (
//     <div
//       style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
//     >
//       <form>
//         <input
//           type="text"
//           placeholder="Search Pokémon..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{
//             padding: "8px",
//             width: "400px",
//             fontSize: "20px",
//             border: "2px solid #ffcc00",
//             borderRadius: "8px",
//             backgroundColor: "#f8f8f8",
//             textAlign: "center",
//           }}
//         />
//       </form>
//     </div>
//   );
// }

// export default SearchBar;

import React from "react";

function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
    >
      <form onSubmit={onSearch}>
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            width: "400px",
            fontSize: "20px",
            border: "2px solid #ffcc00",
            borderRadius: "8px",
            backgroundColor: "#f8f8f8",
            textAlign: "center",
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "8px 16px",
            fontSize: "18px",
            backgroundColor: "#ffcc00",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
