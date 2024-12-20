import React from 'react';
import './../Home.css';
import burgerImage from '../images/burger.jpeg';
import drinkImage from '../images/drink.jpeg';
import foodImage from '../images/food.jpeg';
import platImage from '../images/drink1.jpg';

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to My Canteen</h1>
                <p>Hungry? Let’s get started with your order!</p>
            </header>
            <div className="home-images">
                <img src={burgerImage} alt="Burger" className="home-image" />
                <img src={drinkImage} alt="Drink" className="home-image" />
                <img src={foodImage} alt="Food" className="home-image" />
                <img src={platImage} alt="drink1" className="home-image" />
            </div>
            <nav className="home-nav">
                <div className='register'>
                    <a href="/Canteen-Ordering-System-/register" className="home-link">Register</a>
                </div>
            
                <div className='login'>  
                    <a href="/Canteen-Ordering-System-/login" className="home-link">Login</a>
                </div>
            </nav>
        </div>
    );
};

export default Home;

