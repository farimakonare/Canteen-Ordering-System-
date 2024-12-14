import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../Orders.css";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadingState, setLoadingState] = useState({});
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role; 
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  
    const fetchOrders = async () => {
      try {
        let endpoint = `http://localhost:3035/orders/${user.user_id}`;
        if (user.role === 'admin') {
          endpoint = `http://localhost:3035/admin/orders/status/${statusFilter || "pending"}`;
        }
  
        const response = await axios.get(endpoint);
        
        // Handle empty data gracefully
        if (response.data.orders && response.data.orders.length === 0) {
          setError(""); // No orders found, no error
        } else {
          setOrders(response.data.orders);
        }
  
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching orders:', error);
        setError("Failed to fetch orders. Please try again later.");
      }
    };
  
    fetchOrders();
  }, [role, statusFilter]);
  
  const handleUpdateStatus = async (orderId, newStatus) => {
    if (!["confirmed", "cancelled"].includes(newStatus)) {
      alert("Invalid status provided.");
      return;
    }
    setLoadingState((prev) => ({ ...prev, [orderId]: true }));
    try {
      const response = await axios.put(`http://localhost:3035/admin/orders/${orderId}`, { status: newStatus });
      setOrders(orders.map((order) => (order.order_id === orderId ? response.data.order : order)));
      alert("Order status updated successfully!");
    } catch (error) {
      console.error("Failed to update order status:", error);
      setLoading(false);
      alert(error.response?.data?.error || "Failed to update order status.");
    } finally {
      setLoadingState((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:3035/orders/${orderId}`);
      setOrders(orders.filter((order) => order.order_id !== orderId));
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Failed to delete order:", error);
      alert("Failed to delete order.");
    }
  };

  return (
    <div className="orders-container">
      <h1>{role === "admin" ? "Manage Orders" : "Your Orders"}</h1>

      {role === "admin" && (
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="pending">Pending Orders</option>
          <option value="confirmed">Confirmed</option>
        </select>
      )}

      {/* Show loading message until orders are fetched */}
      {loading && <p>Loading orders...</p>}

      {/* Show error message if there is an error */}
      {error && <p className="error-message">{error}</p>}

      {/* Render orders once fetched */}
      {!loading && !error && (
        <ul>
  {orders.map((order) => (
    <li key={order.order_id}>
      <h4>Order ID: {order.order_id}</h4>
      
      <p>Status: {role === "customer" && order.status === "confirmed" ? "Ready for pickup" : order.status}</p>

      <p>Total Price: ${isNaN(order.total_price) ? "N/A" : parseFloat(order.total_price).toFixed(2)}</p>
      <p>Notes: {order.notes || "No notes provided"}</p>
      <p>Payment Status: {order.payment_status}</p>
      <p>
        Items:
        <ul>
          {order.menu_items.map((item, index) => (
            <li key={index}>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </p>
      {loadingState[order.order_id] ? (
        <p>Updating...</p>
      ) : role === "admin" ? (
        <>
          <button onClick={() => handleUpdateStatus(order.order_id, "confirmed")}>Confirm Order</button>
        </>
      ) : (
        order.status === "pending" && <button onClick={() => handleDeleteOrder(order.order_id)}>Delete Order</button>
      )}
    </li>
  ))}
</ul>

      )}

      <div className="go_back">
        <button onClick={() => navigate(role === "admin" ? "/admin-dashboard" : "/customer-dashboard")}>
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Orders;
