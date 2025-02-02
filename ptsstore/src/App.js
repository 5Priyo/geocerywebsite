import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import CartPage from "./Components/Cart";
import Store from "./Components/Store";
import ContactPage from './Components/Contact';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import OrderDetails from './Components/Orderdetails';
import ManageUsers from './Components/Manageusers';
import ManageProducts from './Components/Manageproducts';
import OrderDetail from './Components/order';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Store />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<OrderDetail />}/>

          {/* Protected Routes for Admin */}
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} allowedRoles={["admin"]} />} />
          <Route path="/all-products" element={<ProtectedRoute element={<ManageProducts />} allowedRoles={["admin"]} />} />
          <Route path="/manage-users" element={<ProtectedRoute element={<ManageUsers />} allowedRoles={["admin"]} />} />
          <Route path="/orderdetails" element={<ProtectedRoute element={<OrderDetails />} allowedRoles={["admin"]} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
