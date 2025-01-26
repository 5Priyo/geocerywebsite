import React, { useState, useEffect } from "react";
import "../CSS/AllProducts.css";
import Dashboard from "./Dashboard";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3005/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      fetch("http://localhost:3005/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newProduct, id: products.length + 1 }),
      })
        .then((response) => response.json())
        .then((addedProduct) => {
          setProducts([...products, addedProduct]);
          setNewProduct({ name: "", price: "", description: "", image: "" });
        });
    } else {
      alert("Please enter valid product details.");
    }
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:3005/products/${id}`, { method: "DELETE" }).then(
      () => {
        setProducts(products.filter((product) => product.id !== id));
      }
    );
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    });
  };

  const handleUpdateProduct = () => {
    if (newProduct.name && newProduct.price && editingProduct) {
      fetch(`http://localhost:3005/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      })
        .then((response) => response.json())
        .then((updatedProduct) => {
          setProducts(
            products.map((product) =>
              product.id === updatedProduct.id ? updatedProduct : product
            )
          );
          setNewProduct({ name: "", price: "", image: "" });
          setEditingProduct(null);
        });
    } else {
      alert("Please enter valid product details.");
    }
  };

  return (
    <>
      <Dashboard />
      <div className="all-products">
        <h1>All Products</h1>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <img
                src={product.image || "/default-placeholder.png"}
                alt={product.name}
              />
              <h2 className="productname">{product.name}</h2>
              <p className="productdescription"> {product.description}</p>
              <p className="productprice"> Rs.{product.price}</p>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="product-delete"
              >
                Delete
              </button>
              <button
                onClick={() => handleEditProduct(product)}
                className="product-edit"
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        <div className="add-product-form">
          <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
              
            } cols="55" rows="5"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          <button
            onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </div>
      </div>
    </>
  );
}

export default AllProducts;
