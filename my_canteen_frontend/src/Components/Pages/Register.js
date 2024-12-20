import React, { useState } from 'react';
import axios from 'axios';
import './../Register.css';
const Register = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [dietaryPreferences, setDietaryPreferences] = useState('');
const [allergies, setAllergies] = useState('');
const [error, setError] = useState(''); 
const [message, setMessage] = useState(''); 
    
    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await axios.post('http://localhost:3035/Postregister', {
                name,
                email,
                password,
                dietary_preferences: dietaryPreferences,
                allergies,
            });
            
            localStorage.setItem("user", JSON.stringify(response.data.user));

            console.log(response.data.user.role);
            console.log("avant la condition");
            
            if (response.data.user.role === 'admin') {
                console.log("je suis dans la condition");
                setMessage('Admin registered successfully!');
                setTimeout(() => (window.location.href = '/Canteen-Ordering-System-/admin-dashboard'), 2000);

            } else {
                console.log("je suis dans le else");
                setMessage('Customer registered successfully!');
                setTimeout(() => (window.location.href = '/Canteen-Ordering-System-/customer-dashboard'), 2000);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Registration failed. Please try again.';
            setError(errorMessage);
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Dietary Preferences"
                    value={dietaryPreferences}
                    onChange={(e) => setDietaryPreferences(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Allergies"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                />
                <button type="submit">Register</button>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
            </form>
        </div>
    );
};

export default Register;
