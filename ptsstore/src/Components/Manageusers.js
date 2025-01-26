import React, { useState, useEffect } from "react";
import "../CSS/ManageUsers.css";
import Dashboard from "./Dashboard";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "user" });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3005/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.password && newUser.role) {
      fetch("http://localhost:3005/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((addedUser) => {
          setUsers([...users, addedUser]);
          setNewUser({ name: "", email: "", password: "", role: "user" });
        });
    } else {
      alert("Please enter valid user details, including a role.");
    }
  };

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:3005/users/${id}`, { method: "DELETE" }).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role || "user", // Default to "user" if role is missing
    });
  };

  const handleUpdateUser = () => {
    if (newUser.name && newUser.email && newUser.password && newUser.role && editingUser) {
      fetch(`http://localhost:3005/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((updatedUser) => {
          setUsers(
            users.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );
          setNewUser({ name: "", email: "", password: "", role: "user" });
          setEditingUser(null);
        });
    } else {
      alert("Please enter valid user details, including a role.");
    }
  };

  return (
    <>
      <Dashboard />
      <div className="manage-users">
        <h1>Manage Users</h1>
        <div className="user-list">
          {users.map((user) => (
            <div key={user.id} className="user-item">
              <h2>{user.name}</h2>
              <p> {user.email}</p>
              <p> {user.role}</p>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="user-delete"
              >
                Delete
              </button>
              <button
                onClick={() => handleEditUser(user)}
                className="user-edit"
              >
                Edit
              </button>
            </div>
          ))}
        </div>

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
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={editingUser ? handleUpdateUser : handleAddUser}>
            {editingUser ? "Update User" : "Add User"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ManageUsers;
