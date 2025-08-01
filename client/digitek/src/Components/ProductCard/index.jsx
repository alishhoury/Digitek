import React, { useState } from "react";
import "./style.css";


const dummyProductItems = [
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    description: "Latest iPhone with advanced features",
    price: 999,
    total_quantity: 5,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
  },
  {
    id: 2,
    name: "Samsung Galaxy Z Fold 6",
    brand: "Samsung",
    description: "Revolutionary foldable smartphone",
    price: 2009,
    total_quantity: 15,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300",
  },
  {
    id: 3,
    name: "3 in 1 Wireless Charger",
    brand: "Apple",
    description: "MagSafe compatible wireless charging station",
    price: 50,
    total_quantity: 51,
    image:
      "https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dw6aa126fb/images/hi-res/3/3c5b1b904592bc64_belkin-WIZ029ttBK-Magnetic-Foldable-Charger-webgallery-hero01-v01-us.jpg?sfrm=png",
  },
  {
    id: 4,
    name: "MacBook Pro 16",
    brand: "Apple",
    description: "Professional laptop with M3 chip",
    price: 2499,
    total_quantity: 8,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300",
  },
  {
    id: 5,
    name: "iPad Air",
    brand: "Apple",
    description: "Versatile tablet for work and creativity",
    price: 599,
    total_quantity: 12,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300",
  },
];

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    if (quantity < product.total_quantity) {
      setQuantity(quantity + 1);
    }
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  return (
    <div className="product-card">
      <div className="card-container">
        <div className="card-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="card-content">
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
          </div>

          <div className="price-stock">
            <p className="price">${product.price}</p>
            <p className="stock">{product.total_quantity} pieces left</p>
          </div>

          <div className="quantity">
            <span className="quantity-display">{quantity}</span>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  return (
    <div className="product-grid">
      {dummyProductItems.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
