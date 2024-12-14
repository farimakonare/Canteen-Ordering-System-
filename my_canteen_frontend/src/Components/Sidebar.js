import "./Sidebar.css";
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <button onClick={() => navigate("/")}>Overview</button>
      {role === "admin" && (
        <>
          <button onClick={() => navigate("/admin-menu")}>Menu Management</button>
          <button onClick={() => navigate("/orders")}>Order Management</button>
          <button onClick={() => navigate("/loyalty-points")}>Loyalty Rules</button>
        </>
      )}
      {role === "customer" && (
        <>
          <button onClick={() => navigate("/menu")}>Menu</button>
          <button onClick={() => navigate("/cart")}>Cart</button>
          <button onClick={() => navigate("/orders")}>Orders</button>
          <button onClick={() => navigate("/loyalty-points")}>Loyalty Points</button>
        </>
      )}
      <button onClick={() => {
        localStorage.removeItem("user"); // Clear user session
        navigate("/login"); // Redirect to login page
      }}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;















