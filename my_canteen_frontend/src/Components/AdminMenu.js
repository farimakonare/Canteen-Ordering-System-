import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminMenu.css";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    nutritional_info: "",
    customization_options: "",
    available: true,
  });

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:3035/menu");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenu();
  }, []);

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3035/menu", formData);
      setMenuItems([...menuItems, response.data.menuItem]);
      alert("Menu item added successfully!");
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  const handleDelete = async (menuId) => {
    try {
      await axios.delete(`http://localhost:3035/admin/menu/${menuId}`);
      setMenuItems(menuItems.filter((item) => item.menu_id !== menuId));
      alert("Menu item deleted successfully!");
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const handleUpdate = async (menuId, updates) => {
    try {
      const response = await axios.put(`http://localhost:3035/menu/${menuId}`, updates);
      setMenuItems(menuItems.map((item) => (item.menu_id === menuId ? response.data.menuItem : item)));
      alert("Menu item updated successfully!");
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  return (
    <div className="admin-menu-container">
      <h1>Menu Management</h1>

      {/* Add Menu Item Form */}
      <form onSubmit={handleAddMenuItem} className="menu-form">
        <h3>Add New Menu Item</h3>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Nutritional Info"
          value={formData.nutritional_info}
          onChange={(e) => setFormData({ ...formData, nutritional_info: e.target.value })}
        />
        <input
          type="text"
          placeholder="Customization Options (JSON)"
          value={formData.customization_options}
          onChange={(e) => setFormData({ ...formData, customization_options: e.target.value })}
        />
        <button type="submit">Add Menu Item</button>
      </form>

      {/* Display Menu Items */}
      <h3>Menu Items</h3>
      <ul>
        {menuItems.map((item) => (
          <li key={item.menu_id}>
            <h4>{item.name}</h4>
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
            <button onClick={() => handleDelete(item.menu_id)}>Delete</button>
            <button
              onClick={() =>
                handleUpdate(item.menu_id, {
                  name: item.name,
                  price: item.price + 1, // Example update: Increment price by 1
                })
              }
            >
              Update Price +1
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMenu;
