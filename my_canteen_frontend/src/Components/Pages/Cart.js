import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../Cart.css';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const user = JSON.parse(localStorage.getItem('user'));
  const [loading, setLoading] = useState(true);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const navigate = useNavigate();

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3035/cart/${user.user_id}`);
      processCartItems(response.data.cartItems);
    } catch (err) {
      console.error('Error fetching cart:', err);
      alert('Failed to fetch cart items!');
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const processCartItems = (items) => {
    const itemMap = {};
    items.forEach(item => {
      if (itemMap[item.menu_item_id]) {
        itemMap[item.menu_item_id].quantity += item.quantity;
      } else {
        itemMap[item.menu_item_id] = { ...item };
      }
    });
    const consolidatedItems = Object.values(itemMap);
    setCartItems(consolidatedItems);
    calculateTotal(consolidatedItems);
  };

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    if (!localStorage.getItem("loyalty_points")) {
      localStorage.setItem("loyalty_points", "0");
    }
    setLoyaltyPoints(parseInt(localStorage.getItem("loyalty_points")));
    fetchCart();
  }, [user.user_id]);

  const handleDelete = async (menuItemId) => {
    const item = cartItems.find(item => item.menu_item_id === menuItemId);
    if (item.quantity > 1) {
      try {
        const response = await axios.put(`http://localhost:3035/cart/${user.user_id}/${menuItemId}`, {
          quantity: item.quantity - 1
        });
        if (response.status === 200) {
          const updatedItems = cartItems.map(item => 
            item.menu_item_id === menuItemId ? {...item, quantity: item.quantity - 1} : item
          );
          setCartItems(updatedItems);
          calculateTotal(updatedItems);
          alert('Item quantity decreased!');
        } else {
          alert('Failed to update item quantity!');
        }
      } catch (err) {
        alert('Failed to update item quantity!');
      }
    } else {
      try {
        const response = await axios.delete(`http://localhost:3035/cart/${user.user_id}/${menuItemId}`);
        if (response.status === 200) {
          const updatedItems = cartItems.filter(item => item.menu_item_id !== menuItemId);
          setCartItems(updatedItems);
          calculateTotal(updatedItems);
          alert('Item removed from cart!');
        } else {
          alert('Failed to remove item!');
        }
      } catch (err) {
        alert('Failed to remove item!');
      }
    }
  };

  const handleApplyDiscount = () => {
    if (loyaltyPoints >= 70) {
      const discountAmount = totalPrice * 0.50; 
      const newTotalPrice = totalPrice - discountAmount;
      setTotalPrice(newTotalPrice);
      setDiscountApplied(true);
      alert('50% discount applied!');
    } else if (loyaltyPoints >= 50) {
      const discountAmount = totalPrice * 0.25; 
      const newTotalPrice = totalPrice - discountAmount;
      setTotalPrice(newTotalPrice);
      setDiscountApplied(true);
      alert('25% discount applied!');
    } else {
      alert('You need at least 50 loyalty points to apply a discount.');
    }
  };

  const confirmOrder = async () => {
    const userId = user?.user_id;
    try {
        const orderItems = cartItems.map(item => ({
            menu_item_id: item.menu_item_id,
            quantity: item.quantity,
            price: item.price,
            customization: item.customization.note || ""
        }));

        const response = await axios.post('https://canteen-backend.onrender.com/orders', {
            user_id: user.user_id,
            menu_items: orderItems,
            total_price: totalPrice
        });

        if (response.status === 201) {
            const loyaltyIncrement = 2; 
            const updatedPoints = user.loyalty_points + loyaltyIncrement; 
            user.loyalty_points = updatedPoints; 
            localStorage.setItem('user', JSON.stringify(user));

            const LocalLoyaltyPoints = parseInt(localStorage.getItem("loyalty_points")) + loyaltyIncrement;
            localStorage.setItem("loyalty_points", LocalLoyaltyPoints.toString());

            alert('Order confirmed successfully! Loyalty points updated.');
            navigate('/orders'); 
        }
    } catch (error) {
        console.error('Error confirming order:', error);
        alert('Failed to confirm order. Please try again.');
    }
  };

  return (
    <div className="cart-container">
      {loading ? (
        <p>Loading cart...</p>
      ) : (
        <>
          <h2>Your Cart</h2>
          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item) => (
                <li key={item.menu_item_id} className="cart-item">
                  <div className="item-details">
                    <h3>{item.item_name}</h3>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
                    <p>Customization: {item.customization.note || "No note added"}</p>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(item.menu_item_id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="total-section">
            <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
            {loyaltyPoints >= 50 && !discountApplied && (
              <button
                className="apply-discount-button"
                onClick={handleApplyDiscount}
              >
                Apply Discount
              </button>
            )}
          </div>
          <button
            className="confirm-order-button"
            onClick={confirmOrder}
            disabled={cartItems.length === 0}
          >
            Confirm Order
          </button>
          <div className="go_back">
            <button onClick={() => navigate("/customer-dashboard")}>
              Go Back to Dashboard
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
