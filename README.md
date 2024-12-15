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
Login
Fetching menu
Adding items to the cart
Placing an order
Tracking order status


Deployment Requirements:
The project is fully deployed and accessible via the provided link.
The application is functional on both desktop and mobile devices.

Conclusion:
The Canteen Ordering System is a robust platform that simplifies the ordering process while enhancing user engagement through a loyalty program and real-time order tracking.
