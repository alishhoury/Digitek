import ProductCard from "../../Components/ProductCard";
import SearchBar from "../../Components/searchbar";
import Pagination from "../../Components/pagination";
import { useState } from "react";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <div className="home-page">
      <SearchBar />
      <ProductCard currentPage={currentPage} />
      <Pagination onPageChange={handlePageChange} />
    </div>
  );
};

export default HomePage;
