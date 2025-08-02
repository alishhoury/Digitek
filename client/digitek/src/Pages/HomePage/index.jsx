import ProductCard from "../../Components/ProductCard";
import SearchBar from "../../Components/searchbar";
import Pagination from "../../Components/pagination";


const HomePage = (page) => {

  return (
    <div className="home-page">

      <SearchBar />
      <ProductCard />
      <Pagination />
      
    </div>
  );
};

export default HomePage;