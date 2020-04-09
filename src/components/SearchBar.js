import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";

const SearchBar = ({ setData }) => {
  const [research, setResearch] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://leboncoin-de-julie.herokuapp.com/offers/with-count?title=${research}`
    );
    setData(response.data);
  };

  return (
    <div className="d-flex centered aligned">
      <form onSubmit={handleSubmit} className="searchbar aligned space-between">
        <input
          name="research"
          className="input-search"
          type="text"
          placeholder="Que recherchez vous ?"
          onChange={(e) => {
            e.preventDefault();
            setResearch(e.target.value);
          }}
        ></input>
        <FontAwesomeIcon className="search-bar-i-search" icon="search" />
        <button type="submit" className="searchbar-btn">
          Rechercher
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
