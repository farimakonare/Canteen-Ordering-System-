import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import Register from './Components/Pages/Register';
import Login from './Components/Pages/Login';
import Menu from './Components/Pages/Menu';
import Cart from './Components/Pages/Cart';
import LoyaltyPoints from './Components/Pages/LoyaltyPoints';
import Orders from './Components/Pages/Orders';
import Dashboard from './Components/Dashboard';
import AdminMenu from './Components/AdminMenu';

function App() {
  return (
    <Router basename="/Canteen-Ordering-System-">
      <Routes>
        {/*shares routes*/}
        <Route path="/" element={<Home />} />
        <Route path="/Canteen_Ordering_System-/login" element={<Login />} />
        <Route path="/Canteen_Ordering_System-/register" element={<Register />} />
        <Route path="/Canteen_Ordering_System-/menu" element={<Menu />} />
        <Route path="/Canteen_Ordering_System-/cart" element={<Cart />} />
        <Route path="/Canteen_Ordering_System-/loyalty-points" element={<LoyaltyPoints />} />

        {/* Customer-Specific Routes */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/customer-dashboard" element={<Dashboard />} />
         
        {/* Customer-Specific Routes */}        
        <Route path="/admin-dashboard" element={<Dashboard />} /> 
        <Route path="/admin-menu" element={<AdminMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
