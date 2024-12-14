import React from "react";
import "./Widgets.css";
const Widgets = ({ role }) => {
    return (
      <div className="widgets">
        <p>{role === "admin" ? "Admin Widgets" : "Customer Widgets"}</p>
      </div>
    );
  };
  
  export default Widgets;
  