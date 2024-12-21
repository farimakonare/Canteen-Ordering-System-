# Canteen-Ordering-System-

Project Overview:
The Canteen Ordering System is a responsive web platform designed to streamline the process of ordering food and beverages for students and staff. The platform allows users to:
- Browse the menu with detailed item descriptions.
- Customize menu items 
- Add items to a cart and place orders.
- Track the status of their orders in real-time (e.g., pending, Ready for Pickup).
- Earn loyalty points for each order, redeemable for discounts.

Deployment Link:
The project is deployed and accessible via this link:
https://farimakonare.github.io/Canteen-Ordering-System-


Login Details:
For testing authentication, use the following login credentials:

Username: testuser@example.com
Password: password123

Feature Checklist
Below is a checklist of the required features implemented in the project:

A. User Features
1. User Registration & Profile Management
 Secure user registration and login.
 - [yes] Profile management to store user preferences (dietary restrictions, allergies).
 - [yes] Profile management to store user preferences (dietary restrictions, allergies).

2. Menu Display & Customization
 - [yes] Dynamic display of menu items with detailed information (name, price, category, nutritional info).
 - [yes] Menu item customization options

 3. Ordering System with Cart
 - [yes] Add items to the cart.
 - [yes] View order totals and adjust orders before confirming.

 4. Order Tracking & Loyalty Program
 - [yes] Real-time order status tracking.
 - [yes] Loyalty program to earn and redeem points for discounts.

B. Admin Features
1. Menu Management
 - [yes] Add new menu items (Admin-only feature).
 - [yes] Update menu items, including price, category, and availability.
 - [yes] Delete menu items.
2. Order Management
 - [yes] View all orders by status (e.g., Pending, Confirmed, Cancelled).
 - [yes] Confirm or cancel orders.
 - [yes] Update order status.
3. User Management
 - [yes] View all orders placed by a specific user.

API Documentation:
Key API Endpoints:

User Registration:
POST /register
Registers a new user.

User Login
POST /login
Authenticates a user.

Fetch Menu
GET /menu

Retrieves the list of menu items.
POST /menu

Updates an existing menu item.
PUT /menu/:menuId

Deletes a menu item (Admin access required).
DELETE /admin/menu/:menuId

Add to Cart
POST /cart
Adds a menu item to the user’s cart.

Place Order
POST /orders

Confirms the user’s order.
GET /cart/:userId

Track Order
GET /orders/:orderId

Retrieves all orders with a specific status (e.g., Pending, Confirmed).
GET /admin/orders/status/:status


Confirms an order.
PUT /admin/orders/:orderId/confirm

Cancels an order.
PUT /admin/orders/:orderId/cancel

Updates loyalty program rules.
POST /admin/loyalty/rules

Retrieves a user's loyalty points.
GET /loyalty/:userId


Postman Test Screenshots
Include screenshots of successful Postman tests for the following endpoints:

Registration
![Pasted Graphic](https://github.com/user-attachments/assets/c53c2773-0e48-4646-a329-5c4b653a3c72)
Login
![Pasted Graphic 1](https://github.com/user-attachments/assets/96380a4a-f865-44f3-a90c-e65c9facfe50)
Logout
![Pasted Graphic 2](https://github.com/user-attachments/assets/91de3e4f-abd6-4318-ac87-98433f252100)
Fetching menu
![Pasted Graphic 3](https://github.com/user-attachments/assets/46fd29a3-cf4c-497c-9562-1afff41496f2)
Add item to menu before checkAdmin
![Pasted Graphic 4](https://github.com/user-attachments/assets/0b076ce7-8291-4083-a42b-54e0a848b086)
Fetch Orders by user id
![Pasted Graphic 5](https://github.com/user-attachments/assets/dc337b16-7d51-4b2f-af56-8f52027fe7e8)
Track Orders by user id
![Pasted Graphic 6](https://github.com/user-attachments/assets/076348fe-453c-4d6d-a732-9bfee25e3083)
Admin confirm/cancel order
![Pasted Graphic 7](https://github.com/user-attachments/assets/a88ab0ea-3a07-4728-aa5d-4c2b3659ec96)
Adding items to the cart
![Pasted Graphic 8](https://github.com/user-attachments/assets/e69b5fdf-5440-466b-9730-de1c7250cf95)
Fetching cart items of a user using user id
![Pasted Graphic 9](https://github.com/user-attachments/assets/2ebf540c-235e-44cc-84a4-cc4d6475cfd8)
Update cart item qty or customisation
![Pasted Graphic 10](https://github.com/user-attachments/assets/2c05d9cf-deed-42aa-abd7-2d4987942742)
Delete cart item
![Pasted Graphic 11](https://github.com/user-attachments/assets/81132cc7-ce03-437f-ac7a-9dc85e2c5bb0)
Placing an order
![Pasted Graphic 12](https://github.com/user-attachments/assets/c823e000-e5c2-43bf-b376-f3b2c4f66c56)
Tracking order status
![Pasted Graphic 13](https://github.com/user-attachments/assets/db9cefaa-8ee9-40b4-b770-e52c6b23f297)
Fetching loyalty points
![Pasted Graphic 14](https://github.com/user-attachments/assets/52a21481-b79e-4280-905c-edc9252fedef)

Deployment Requirements:
The project is fully deployed and accessible via the provided link.
The application is functional on both desktop and mobile devices.

Conclusion:
The Canteen Ordering System is a robust platform that simplifies the ordering process while enhancing user engagement through a loyalty program and real-time order tracking.
