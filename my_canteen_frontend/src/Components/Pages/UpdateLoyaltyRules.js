import React, { useState } from "react";
import axios from "axios";
import './../UpdateLoyaltyRules.css';

const AddLoyaltyPoints = () => {
    const [userId, setUserId] = useState("");
    const [points, setPoints] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://canteen-backend.onrender.com/admin/loyalty/add", {
                user_id: userId,
                points: parseInt(points),
            });
            alert(`Loyalty points updated! New total: ${response.data.loyaltyPoints}`);
        } catch (error) {
            console.error("Error adding loyalty points:", error);
            alert("Failed to update loyalty points.");
        }
    };

    return (
        <div>
            <h1>Add Loyalty Points</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Points to Add"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    required
                />
                <button type="submit">Add Points</button>
            </form>
        </div>
    );
};

export default AddLoyaltyPoints;
