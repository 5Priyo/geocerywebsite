import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./Components/Cart";  // Corrected the import path
import Store from "./Components/Store"; // Corrected the import path
import ContactPage from './Components/Contact';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import OrderDetails from './Components/Orderdetails';
import ManageUsers from './Components/Manageusers';
import  ManageProducts from './Components/Manageproducts';
import OrderDetail from'./Components/order';


function App() {
  return (
    <Router>
     

        <Routes>
          {/* Routes for Store and CartPage */}
          <Route path="/" element={<Store />} /> {/* Store page route */}
          <Route path="/cart" element={<CartPage />} /> {/* Cart page route */}
          <Route path="/contact" element={<ContactPage />} /> {/* Cart page route */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Default route */}
          <Route path="/login" element={<Login />} /> {/* Default route */}
          <Route path="/all-products" element={< ManageProducts />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/order" element={<OrderDetail/>} />
          <Route path="/orderdetails" element={<OrderDetails/>}/>
         
        </Routes>
    
    </Router>
  );
}

export default App;
