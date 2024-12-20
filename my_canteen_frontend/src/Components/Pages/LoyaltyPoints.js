import React, { useState, useEffect } from "react";
import "./../LoyaltyPoints.css";

const LoyaltyPoints = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loyaltyPoints, setLoyaltyPoints] = useState(parseInt(localStorage.getItem("loyalty_points")) || 0); 


  const getDiscount = () => {
    if (loyaltyPoints >= 50 && loyaltyPoints <= 70) {
      return "You get a 25% discount!";
    } else if (loyaltyPoints > 70 && loyaltyPoints <= 100) {
      return "You get a 50% discount!";
    }else if (loyaltyPoints > 100) {
      return "You get a 70% discount!";
    }
     else {
      return "Keep ordering to unlock discounts!";
    }
  };

  useEffect(() => {
    if (user) {
      user.loyalty_points = loyaltyPoints;
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [loyaltyPoints, user]);

  const navigateToMenu = () => {
    window.location.href = "/Canteen-Ordering-System-/menu";
  };

  return (
    <div className="loyalty-container">
      <h1>Customer Loyalty Program</h1>

      <div className="loyalty-info">
        <p>Encouraging you to place more orders to increase your loyalty points!</p>
        <p>Once you reach the following points, you will receive discounts:</p>
        <ul>
          <li>50-70 points: 25% discount</li>
          <li>70-100 points: 50% discount</li>
        </ul>
      </div>

      <div className="loyalty-status">
        <h2>Current Loyalty Points</h2>
        <p>{loyaltyPoints} points</p>
      </div>

      <div className="loyalty-discount">
        <h3>Discount Status</h3>
        <p>{getDiscount()}</p>
      </div>

      <div className="loyalty-actions">
        <button onClick={navigateToMenu}>Go to Menu</button>
      </div>
    </div>
  );
};

export default LoyaltyPoints;
