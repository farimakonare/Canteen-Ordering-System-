import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || ""; // Role is automatically assigned from the database

  // State management
  const [activeSection, setActiveSection] = useState("overview");

  // Redirect to login if no user
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/login"); // Redirect to login page
  };

  // Dynamically render content based on role and active section
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <h1>Welcome to the {role === "admin" ? "Admin" : "Customer"} Dashboard!</h1>;
      case "menu":
        navigate("/menu");
        break;
      case "orders":
        navigate("/orders");
        break;
      case "cart":
        if (role === "customer") navigate("/cart");
        break;
      case "loyalty":
        navigate("/loyalty");
        break;
      case "logout":
        handleLogout();
        break;
      default:
        return <h1>Section not found.</h1>;
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar options based on role */}
      <Sidebar
        role={role}
        options={
          role === "admin"
            ? ["overview", "menu", "orders", "loyalty", "logout"] // Admin options
            : ["overview", "menu", "cart", "orders", "loyalty", "logout"] // Customer options
        }
        setActiveSection={setActiveSection}
      />
      <div className="main-content">
        <Navbar
          userName={user?.name || "Guest"}
          role={role}
          onLogout={handleLogout}
        />
        <div className="dashboard-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
