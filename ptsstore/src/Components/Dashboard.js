import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("products");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const [editingProduct, setEditingProduct] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editingUser, setEditingUser] = useState(null);


  // Fetch data from json-server
  useEffect(() => {
    fetch("http://localhost:3005/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));

    fetch("http://localhost:3005/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
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
          setNewProduct({ name: "", price: "", image: "" });
        });
    } else {
      alert("Please enter valid product details.");
    }
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:3005/products/${id}`, {
      method: "DELETE",
    }).then(() => {
      setProducts(products.filter((product) => product.id !== id));
    });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleUpdateProduct = () => {
    if (newProduct.name && newProduct.price && editingProduct) {
      fetch(`http://localhost:3005/products/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
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

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      fetch("http://localhost:3005/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((addedUser) => {
          setUsers([...users, addedUser]);
          setNewUser({ name: "", email: "" });
        });
    } else {
      alert("Please enter valid user details.");
    }
  };

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:3005/users/${id}`, {
      method: "DELETE",
    }).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ name: user.name, email: user.email });
  };

  const handleUpdateUser = () => {
    if (newUser.name && newUser.email && editingUser) {
      fetch(`http://localhost:3005/users/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((updatedUser) => {
          setUsers(
            users.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );
          setNewUser({ name: "", email: "" });
          setEditingUser(null);
        });
    } else {
      alert("Please enter valid user details.");
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        {/* <h1>Admin Dashboard</h1> */}
        <div className="dashboardnav">
          <Link to="/">
            <img
              src="/logodashboard.png"
              alt="PTS Grocery Store"
              className="contact-image"
              style={{ width: "100px", height: "100px" }}
            />
          </Link>
        </div>
        <ul>
          <li
            onClick={() => setActiveMenu("products")}
            className={activeMenu === "products" ? "active" : ""}
          >
            All Products
          </li>
          <li
            onClick={() => setActiveMenu("users")}
            className={activeMenu === "users" ? "active" : ""}
          >
            Manage Users
          </li>
          <li>
            <Link to ="/orderdetails" className="activeMenus">OrderDetails</Link>
          </li>
          <li>
            <button onClick={() => navigate("/cart")}>View Cart</button>
          </li>
          
        </ul>
      </aside>

      <main className="content">
        {/* All Products Section */}
        {activeMenu === "products" && (
          <div>
            {/* <h1>All Grocery Products</h1> */}
            <div className="product-list">
              {products.map((product) => (
                <div key={product.id} className="product-item">
                  <img
                    src={product.image || "/default-placeholder.png"}
                    alt={product.name}
                  />
                  <h2>{product.name}</h2>
                  <p>Price: Rs.{product.price}</p>
                  <button onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </button>
                  <button onClick={() => handleEditProduct(product)}>
                    Edit
                  </button>
                </div>
              ))}
            </div>

            {/* Product Edit or Add Form */}
            <div className="add-product-form">
              <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
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
        )}

        {/* Manage Users Section */}
        {activeMenu === "users" && (
          <div>
            <h1>Manage Users</h1>
            <div className="user-list">
              {users.map((user) => (
                <div key={user.id} className="user-item">
                  <h2>{user.name}</h2>
                  <p>Email: {user.email}</p>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                  <button onClick={() => handleEditUser(user)}>
                    Edit
                  </button>
                </div>
              ))}
            </div>

            {/* User Edit or Add Form */}
            <div className="add-user-form">
              <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <button onClick={editingUser ? handleUpdateUser : handleAddUser}>
                {editingUser ? "Update User" : "Add User"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
