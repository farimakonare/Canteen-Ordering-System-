import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../Menu.css";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [addingItemId, setAddingItemId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const addToCart = async (menuItemId) => {
    if (!user) {
      alert("Please log in to add items to the cart.");
      navigate('/login'); 
      return;
    }
    setAddingItemId(menuItemId)
    try {
      await axios.post("http://localhost:3035/cart", {
        user_id: user.user_id,
        menu_item_id: menuItemId,
        quantity: 1,
        customization: {},
      });
      alert("Item added to cart successfully!");
      setCartCount(cartCount + 1);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart.");
    } finally {
      setAddingItemId(null); 
    }
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:3035/menu");
        setMenu(response.data);
    
        const uniqueCategories = [...new Set(response.data.map(item => item.category))];
        setCategories(uniqueCategories);
        console.log("Categories loaded:", uniqueCategories);  // Check what categories are loaded
    
        setError("");
      } catch (error) {
        console.error("Error fetching menu:", error);
        setError("Failed to load menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);
  

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="menu-container">
      <h1>Menu</h1>
      {loading && <p>Loading menu...</p>}
      {error && <p className="error-message">{error}</p>}
      {categories.map(category => (
        <details key={category} className="category-section">
          <summary>{category}</summary>
          <div className="menu-items">
            {menu.filter(item => item.category === category).map(item => (
              <div key={item.menu_id} className="menu-item">
                <img src={item.image_url || "https://via.placeholder.com/150"} alt={item.name} className="menu-item-image"/>
                <h3>{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Category: {item.category}</p>
                {item.nutritional_info && <p>Info: {item.nutritional_info}</p>}
                {item.customization_options && <p>Customizations: {JSON.stringify(item.customization_options)}</p>}
                <p>Status: {item.available ? "Available" : "Unavailable"}</p>
                {item.available && (
                  <button
                    className="add-to-cart"
                    onClick={() => addToCart(item.menu_id)}
                    disabled={addingItemId === item.menu_id}
                  >
                    {addingItemId === item.menu_id ? "Adding Item..." : "Add to Cart"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </details>
      ))}
      <div className="cart-indicator">
        <p>Items in Cart: {cartCount}</p>
        <button className="view-cart" onClick={() => (window.location.href = "/Canteen-Ordering-System-/cart")}>View Cart</button>
      </div>
    </div>
    
  ); 
};

export default Menu;
