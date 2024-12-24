import axios from 'axios';

const api = axios.create({
    baseURL: 'https://canteen-backend.onrender.com', 
});

export default api;
