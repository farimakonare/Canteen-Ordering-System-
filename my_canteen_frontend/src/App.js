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
    <Router basename="/">
      <Routes>
        {/*shares routes*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/loyalty-points" element={<LoyaltyPoints />} />

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
