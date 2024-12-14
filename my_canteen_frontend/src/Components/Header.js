import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Order History</Link>
            <Link to="/loyalty">Loyalty Points</Link>
            <Link to="/profile">Profile</Link>
        </nav>
    );
};

export default Header;
