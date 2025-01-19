import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Productserver from "./Components/Productserver";  // Corrected the import path
import CartPage from "./Components/Cart";  // Corrected the import path
import Store from "./Components/Store"; // Corrected the import path
import ContactPage from './Components/Contact';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import OrderDetails from './Components/Orderdetails';
// import Cards from './Components/Card';

function App() {
  return (
    <Router>
      {/* <div className="AllPage"> */}
        {/* Productserver page without routing */}
       

        <Routes>
          {/* Routes for Store and CartPage */}
          <Route path="/" element={<Store />} /> {/* Store page route */}
          <Route path="/cart" element={<CartPage />} /> {/* Cart page route */}
          <Route path="/contact" element={<ContactPage />} /> {/* Cart page route */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Default route */}
          <Route path="/login" element={<Login />} /> {/* Default route */}
          <Route path="/orderdetails" element={<OrderDetails/>}/>
          {/* <Cards /> */}
        </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;
