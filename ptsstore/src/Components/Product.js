import React, { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import "../CSS/Productserver.css";

function Productserver({ displayNotification, updateCartCount, addToCart, searchQuery }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null); // Tracks which product is expanded

  useEffect(() => {
    loadData();
  }, []);

  const filterProducts = useCallback(
    (query) => {
      if (query) {
        const words = query.trim().split(/\s+/).slice(0, 3).join(" ");
        const filtered = products.filter((product) => {
          const productNameMatch = product.name
            .toLowerCase()
            .includes(words.toLowerCase());
          const productCategoryMatch =
            product.category &&
            product.category.toLowerCase().includes(words.toLowerCase());
          return productNameMatch || productCategoryMatch;
        });
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
    },
    [products]
  );

  useEffect(() => {
    filterProducts(searchQuery);
  }, [searchQuery, products, filterProducts]);

  const loadData = async () => {
    try {
      const response = await Axios.get("http://localhost:3005/products");
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="productserver">
      <h1 className="ph1">Product List</h1>

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
              <h2 className="productname">{product.name}</h2>
              <div>
                <p
                  className="productdescription"
                  style={{
                    display: expandedProductId === product.id ? "block" : "-webkit-box",
                    WebkitLineClamp: expandedProductId === product.id ? "none" : 2,
                    WebkitBoxOrient: "vertical",
                    overflow: expandedProductId === product.id ? "visible" : "hidden",
                  }}
                >
                  {product.description}
                </p>
                <button
                  onClick={() =>
                    setExpandedProductId(
                      expandedProductId === product.id ? null : product.id
                    )
                  }
                  style={{
                    marginTop: "5px",
                    background: "none",
                    border: "none",
                    color: "darkblue",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {expandedProductId === product.id ? "Show Less" : "Read More.."}
                </button>
              </div>
              <p className="productprice">Rs.{product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Productserver;
