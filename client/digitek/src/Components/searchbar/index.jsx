import React, { useState } from "react";
import "./style.css";


const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm)
      
    }
  }

  

      return (
    <div className="searchBar">

      <div>
        <input 
          type="text"
          placeholder="What are you looking for?"
          className="Search-Bar"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          
        />
      </div>

    </div>    
    );

}

export default SearchBar;
