import React from "react";
import "./search.subpage.scss";

function Search({ onSearchChange }) {
  return (
    <div className="search">
      <form>
        <input
          className="searchbar"
          placeholder="어느 교재가 필요하신가요?"
          onChange={onSearchChange}
        />
      </form>
    </div>
  );
}

export default Search;
