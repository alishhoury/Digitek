import ProductCard from "../../Components/ProductCard";
import SearchBar from "../../Components/searchbar";
import Pagination from "../../Components/pagination";
import { useState, useEffect } from "react";
import ProductGrid from "../../Components/ProductCard";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");


  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);



  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch}/>
      <ProductGrid currentPage={currentPage} searchTerm={searchTerm}/>
      <Pagination onPageChange={handlePageChange} currentPage={currentPage}/>
    </div>
  );
};

export default HomePage;
