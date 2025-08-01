import ProductCard from "../../Components/ProductCard";
import SearchBar from "../../Components/searchbar";


const HomePage = () => {

  return (
    <div className="home-page">

      <SearchBar />
      <ProductCard />
      
    </div>
  );
};

export default HomePage;