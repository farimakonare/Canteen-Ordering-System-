import React, { useState } from "react";
import axios from "axios";
import "./../Login.css";


const Login = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [message, setMessage] = useState(""); 
const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
      e.preventDefault();
      setError("");
      setMessage("");
      setLoading(true);
  
      try {
          const response = await axios.post("https://canteen-backend.onrender.com/login", { email, password });
  
          // Store user data in localStorage
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem('token', response.data.token);
  
          // Redirect based on role
          if (response.data.user.role === "admin") {
            setMessage('Admin registered successfully!');
            setTimeout(() => {
                setLoading(false); 
                window.location.href = '/Canteen-Ordering-System-/admin-dashboard';
            }, 2000);
          } else if (response.data.user.role === "customer") {
            setMessage('Customer registered successfully!');
            setTimeout(() => {
                setLoading(false); 
                window.location.href = '/Canteen-Ordering-System-/customer-dashboard';
            }, 2000);
          } else {
              throw new Error("Unknown role detected.");
          }
      } catch (err) {
        setError(err.response?.data?.error || "Login failed. Please try again.");
        setLoading(false); 
    }
  };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"} {/* Conditional rendering for button text */}
                </button>
                {error && <p className="error-message">{error}</p>} {/* Display error */}
                {message && <p className="success-message">{message}</p>} {/* Display success */}
            </form>
        </div>
    );
};

export default Login;
