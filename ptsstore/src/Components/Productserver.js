import React, { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import "./Productserver.css";

function Productserver({ displayNotification, updateCartCount, addToCart, searchQuery }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  // Memoize filterProducts to prevent unnecessary re-renders
  const filterProducts = useCallback((query) => {
    if (query) {
      // Limit query to 3 words
      const words = query.trim().split(/\s+/).slice(0, 3).join(" ");

      const filtered = products.filter((product) => {
        // Search by name and category
        const productNameMatch = product.name.toLowerCase().includes(words.toLowerCase());
        const productCategoryMatch = product.category && product.category.toLowerCase().includes(words.toLowerCase());
        return productNameMatch || productCategoryMatch;
      });

      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // If no query, show all products
    }
  }, [products]);

  useEffect(() => {
    filterProducts(searchQuery);
  }, [searchQuery, products, filterProducts]);

  const loadData = async () => {
    try {
      const response = await Axios.get("http://localhost:3005/products");
      setProducts(response.data);
      setFilteredProducts(response.data); // Initially show all products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="productserver">
      <h1 className="ph1">Product List</h1>

      {/* Only show "No products found" if there are no products after filtering */}
      {searchQuery && filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p> Rs.{product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Productserver;
