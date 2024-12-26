import React from "react";
import Search from "../../assets/Admin images/search.png";
import { Input, SearchIcon, SearchWrapper } from "./search.style.js";

const Searchbar = ({
  onKeyDown,
  onChange,
  searchTerm,
  backgroundColor,
  border,
  color,
  placeholder = "Search",
}) => {
  const handleClick = (event) => {
    event.stopPropagation();
  };

  return (
    <SearchWrapper onClick={handleClick} >
      <SearchIcon src={Search} alt="Search" />
      <Input
        placeholder={placeholder}
        onChange={onChange}
        value={searchTerm}
        onKeyDown={onKeyDown}
        style={{
          width: "100%",
          height: "50px",
          outline: "none",
          backgroundColor: backgroundColor,
          border: border,
          color: color,
          borderRadius: "10px",
        }}
      />
    </SearchWrapper>
  );
};

export default Searchbar;
