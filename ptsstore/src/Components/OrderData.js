import React, { useState, useEffect } from 'react';
import './OrderDetails.css'; // Create appropriate styles

function OrderDetails() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ product: '', quantity: 1, total: 0 });
  const [editingOrder, setEditingOrder] = useState(null);

  // Fetch Orders
  useEffect(() => {
    fetch('http://localhost:3005/orders')
      .then(response => response.json())
      .then(data => setOrders(data));
  }, []);

  const handleAddOrder = () => {
    if (newOrder.product && newOrder.quantity > 0) {
      const orderData = { ...newOrder, id: orders.length + 1 };
      fetch('http://localhost:3005/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })
        .then(response => response.json())
        .then(addedOrder => {
          setOrders([...orders, addedOrder]);
          setNewOrder({ product: '', quantity: 1, total: 0 });
        });
    } else {
      alert('Please enter valid order details.');
    }
  };

  const handleDeleteOrder = (id) => {
    fetch(`http://localhost:3005/orders/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setOrders(orders.filter(order => order.id !== id));
    });
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setNewOrder({
      product: order.product,
      quantity: order.quantity,
      total: order.total,
    });
  };

  const handleUpdateOrder = () => {
    if (newOrder.product && newOrder.quantity > 0 && editingOrder) {
      fetch(`http://localhost:3005/orders/${editingOrder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      })
        .then(response => response.json())
        .then(updatedOrder => {
          setOrders(
            orders.map(order => (order.id === updatedOrder.id ? updatedOrder : order))
          );
          setNewOrder({ product: '', quantity: 1, total: 0 });
          setEditingOrder(null);
        });
    } else {
      alert('Please enter valid order details.');
    }
  };

  return (
    <div className="order-details">
      <h1>Order Management</h1>
      <div className="order-list">
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>Rs.{order.total}</td>
                <td>
                  <button onClick={() => handleEditOrder(order)}>Edit</button>
                  <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Edit or Add Form */}
      <div className="order-form">
        <h3>{editingOrder ? 'Edit Order' : 'Add New Order'}</h3>
        <input
          type="text"
          placeholder="Product"
          value={newOrder.product}
          onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newOrder.quantity}
          onChange={(e) =>
            setNewOrder({ ...newOrder, quantity: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Total"
          value={newOrder.total}
          onChange={(e) => setNewOrder({ ...newOrder, total: e.target.value })}
        />
        <button onClick={editingOrder ? handleUpdateOrder : handleAddOrder}>
          {editingOrder ? 'Update Order' : 'Add Order'}
        </button>
      </div>
    </div>
  );
}

export default OrderDetails;
