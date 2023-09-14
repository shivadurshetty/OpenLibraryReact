import React from "react";

function Search({ term, searchKeyword }) {
  function handleSearch(e) {
    if (searchKeyword) {
      searchKeyword(e.target.value);
    }
  }

  return (
    <>
      <input
        className="input-field"
        type="text"
        value={term}
        placeholder="Enter book name"
        onChange={handleSearch}
      />
    </>
  );
}

export default Search;
