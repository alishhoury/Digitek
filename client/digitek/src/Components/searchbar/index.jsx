import React, { useState } from "react";
import "./style.css";
import Input from "../Input";


const SearchBar = () => {

      return (
    <div className="searchBar">

      <div>
        <Input hint={"What are you looking for?"} className="Search-Bar"/>
      </div>

    </div>    
    );

}

export default SearchBar;
