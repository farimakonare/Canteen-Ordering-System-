/*
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://canteen-backend.onrender.com', 
});

export default api;
*/

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://canteen-backend.onrender.com',  // You already have this URL
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;