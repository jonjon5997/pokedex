import React from "react";
import "./Pagination.css";

export default function Pagination({ goToNextPage, goToPrevPage }) {
  return (
    <div>
      {goToPrevPage && (
        <button className="pagination__button" onClick={goToPrevPage}>
          Previous
        </button>
      )}
      {goToNextPage && (
        <button className="pagination__button" onClick={goToNextPage}>
          Next
        </button>
      )}
    </div>
  );
}
