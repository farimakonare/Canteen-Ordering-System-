const express = require('express');
const app = express();
const PORT = process.env.PORT || 3035;
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors({
    origin: ['https://farimakonare.github.io/Canteen-Ordering-System-'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],    
    credentials: true                             
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
    user: "canteen",
    host: "dpg-ct8g5r5ds78s73cakrpg-a.oregon-postgres.render.com",
    database: "canteen_info",
    password: "WGvWMsf0gHGjH4KFx6l4XNNLOX5RkryM",
    port: 5432,
    ssl: { rejectUnauthorized: false }
});


// Middleware for checking admin role
const checkAdmin = async (req, res, next) => {
    const { userId } = req.body; // Ensure userId is provided in the request body
    try {
        const result = await pool.query(`SELECT role FROM public.users WHERE user_id = $1`, [userId]);
        if (result.rows.length === 0 || result.rows[0].role !== "admin") {
            console.log(`Access denied for userId: ${userId}`);
            return res.status(403).json({ error: "Access denied. Admins only." });
        }
        console.log(`Admin access granted for userId: ${userId}`);
        next();
    } catch (err) {
        console.error("Error checking admin role:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Middleware for authentication (basic simulation for user login status)
const isAuthenticated = async (req, res, next) => {
    const { userId } = req.body;
    try {
        const result = await pool.query(`SELECT * FROM public.users WHERE user_id = $1`, [userId]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Authentication failed. Please log in." });
        }
        next();
    } catch (err) {
        console.error("Authentication error:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Register
app.post('/Postregister', async (req, res) => {
    const { name, email, password, dietary_preferences, allergies } = req.body;

    try {
        const userCheck = await pool.query('SELECT * FROM public.users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO public.users (name, email, password, dietary_preferences, allergies, role)
             VALUES ($1, $2, $3, $4, $5, 'customer') RETURNING *`,
            [name, email, hashedPassword, dietary_preferences || null, allergies || null]
        );

        res.status(201).json({ message: 'Registration successful!', user: result.rows[0] });
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
       try {
        console.log("Login request:", req.body);

        // Fetch user by email
        const userResult = await pool.query('SELECT * FROM public.users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            console.log("User not found for email:", email);
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = userResult.rows[0];
        console.log("User found:", user);

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isPasswordMatch);

        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
                    });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Logout
app.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
});

// Fetch menu
app.get('/menu', async (req, res) => {
    try {
        const menu = await pool.query(`SELECT * FROM public.menu`);
        res.status(200).json(menu.rows);
    } catch (err) {
        console.error("Error fetching menu:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Admin add on menu
app.post('/menu', checkAdmin, async (req, res) => {
    const { name, price, category, nutritional_info, customization_options, available, image_url } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO public.menu (name, price, category, nutritional_info, customization_options, available, image_url)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [name, price, category, nutritional_info, JSON.stringify(customization_options) || null, available || true, image_url]
        );

        res.status(201).json({ message: "Menu item added successfully", menuItem: result.rows[0] });
    } catch (err) {
        console.error("Error adding menu item:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Update menu item
app.put('/menu/:menuId', checkAdmin, async (req, res) => {
    const { menuId } = req.params;
    const { name, price, category, nutritional_info, customization_options, available, image_url } = req.body;

    try {
        const result = await pool.query(
            `UPDATE public.menu
             SET name = COALESCE($1, name), 
                 price = COALESCE($2, price),
                 category = COALESCE($3, category), 
                 nutritional_info = COALESCE($4, nutritional_info),
                 customization_options = COALESCE($5, customization_options), 
                 available = COALESCE($6, available),
                 image_url = COALESCE($7, image_url)
             WHERE menu_id = $8 RETURNING *`,
            [name, price, category, nutritional_info, JSON.stringify(customization_options) || null, available, image_url, menuId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Menu item not found" });
        }

        res.status(200).json({ message: "Menu item updated successfully", menuItem: result.rows[0] });
    } catch (err) {
        console.error("Error updating menu item:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Admin delete menu item by menu_id 
app.delete('/admin/menu/:menuId', checkAdmin, async (req, res) => {
    const { menuId } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM public.menu
             WHERE menu_id = $1
             RETURNING *`,
            [menuId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.status(200).json({ message: 'Menu item deleted successfully', menuItem: result.rows[0] });
    } catch (err) {
        console.error('Error deleting menu item:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// customer Fetch all their orders by user_id 
app.get('/orders/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query(
            `SELECT * FROM public.orders WHERE user_id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No orders found for this user.' });
        }

        res.status(200).json({ orders: result.rows });
    } catch (err) {
        console.error('Error fetching user orders:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Customer delete order before being confirmed
app.delete('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM public.orders
             WHERE order_id = $1 AND status = 'pending'
             RETURNING *`,
            [orderId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Order not found or already confirmed.' });
        }

        res.status(200).json({ message: 'Order deleted successfully', order: result.rows[0] });
    } catch (err) {
        console.error('Error deleting order:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Track order
app.get('/orders/:orderId', isAuthenticated, async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await pool.query(`SELECT * FROM public.orders WHERE order_id = $1`, [orderId]);
        if (order.rows.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json(order.rows[0]);
    } catch (err) {
        console.error("Error fetching order:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Admin Update order status 
app.put('/admin/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const result = await pool.query(
            `UPDATE public.orders
             SET status = $1, updated_at = CURRENT_TIMESTAMP
             WHERE order_id = $2 RETURNING *`,
            [status, orderId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json({ message: "Order status updated successfully", order: result.rows[0] });
    } catch (err) {
        console.error("Error updating order status:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Admin confirm order 
app.put('/admin/orders/:orderId/confirm', async (req, res) => {
    const { orderId } = req.params;

    try {
        const result = await pool.query(
            `UPDATE public.orders
             SET status = 'confirmed', updated_at = CURRENT_TIMESTAMP
             WHERE order_id = $1
             RETURNING *`,
            [orderId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        res.status(200).json({ message: 'Order confirmed successfully', order: result.rows[0] });
    } catch (err) {
        console.error('Error confirming order:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//Admin cancel order 
app.put('/admin/orders/:orderId/cancel', async (req, res) => {
    const { orderId } = req.params;

    try {
        const result = await pool.query(
            `UPDATE public.orders
             SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
             WHERE order_id = $1
             RETURNING *`,
            [orderId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        res.status(200).json({ message: 'Order cancelled successfully', order: result.rows[0] });
    } catch (err) {
        console.error('Error cancelling order:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Admin Fetch all orders by status 
app.get('/admin/orders/status/:status', async (req, res) => {
    const { status } = req.params;

    try {
        const result = await pool.query(
            `SELECT * FROM public.orders WHERE status = $1`,
            [status]
        );

        if (result.rows.length === 0) {
            return res.status(200).json({ orders: [] }); 
        }

        res.status(200).json({ orders: result.rows });
    } catch (err) {
        console.error('Error fetching orders by status:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//Admin fetch all orders of a user by user_id 
app.get('/admin/orders/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query(
            `SELECT * FROM public.orders WHERE user_id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No orders found for this user.' });
        }

        res.status(200).json({ orders: result.rows });
        console.log("Orders of user:", result.rows); // Debugging log
    } catch (err) {
        console.error('Error fetching orders of user:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Add item to cart
app.post('/cart', async (req, res) => {
    const { user_id, menu_item_id, quantity, customization } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO public.cart (user_id, menu_item_id, quantity, customization, created_at, updated_at)
             VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
             RETURNING *`,
            [user_id, menu_item_id, quantity, customization ? JSON.stringify(customization) : '{}']
        );

        res.status(201).json({ message: 'Item added to cart successfully', cartItem: result.rows[0] });
    } catch (err) {
        console.error("Error adding item to cart:", err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//Fetch all items in cart
app.get('/cart/:userId', async (req, res) => {
    const { userId } = req.params;
    console.log("Fetching cart for userId:", userId); // Debugging log

    try {
        const result = await pool.query(
            `SELECT c.cart_id, c.user_id, c.menu_item_id, c.quantity, 
                    COALESCE(c.customization, '{}') AS customization, 
                    m.name AS item_name, m.price, m.category 
             FROM public.cart AS c
             JOIN public.menu AS m ON c.menu_item_id = m.menu_id
             WHERE c.user_id = $1`,
            [userId]
        );

        console.log("Cart query result:", result.rows); // Debugging log

        if (result.rows.length === 0) {
            console.warn("Cart is empty for userId:", userId);
            return res.status(404).json({ error: 'Cart is empty' });
        }

        res.status(200).json({ cartItems: result.rows });
    } catch (err) {
        console.error("Error fetching cart items:", err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//Delete item from cart
app.delete('/cart/:userId/:menuItemId', async (req, res) => {
    const { userId, menuItemId } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM public.cart
             WHERE user_id = $1 AND menu_item_id = $2
             RETURNING *`,
            [userId, menuItemId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Cart item deleted successfully', deletedItem: result.rows[0] });
    } catch (err) {
        console.error("Error deleting cart item:", err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//Update item quantity or customization in cart
app.put('/cart/:userId/:menuItemId', async (req, res) => {
    const { userId, menuItemId } = req.params;
    const { quantity, customization } = req.body;

    try {
        const result = await pool.query(
            `UPDATE public.cart
             SET quantity = COALESCE($1, quantity),
                 customization = COALESCE($2, customization),
                 updated_at = CURRENT_TIMESTAMP
             WHERE user_id = $3 AND menu_item_id = $4
             RETURNING *`,
            [quantity, customization ? JSON.stringify(customization) : null, userId, menuItemId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Cart item updated successfully', updatedItem: result.rows[0] });
    } catch (err) {
        console.error("Error updating cart item:", err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/orders', async (req, res) => {
    const { user_id, total_price, menu_items } = req.body;
    console.log('Request body:', req.body); // Check incoming data
    console.log('Total Price from request body:', total_price); // Debug total_price

    const status = "pending";

    try {
        const orderResult = await pool.query(
            `INSERT INTO public.orders (user_id, menu_items, status, created_at, updated_at, total_price)
             VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $4)
             RETURNING order_id, user_id, menu_items, status, created_at, total_price, updated_at`,
            [user_id, JSON.stringify(menu_items), status, total_price]
        );

        console.log('Order result:', orderResult.rows[0]); // Verify database entry

        res.status(201).json({ message: 'Order confirmed successfully!', order: orderResult.rows[0] });
    } catch (error) {
        console.error('Error placing order:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//Admin update loyalty rules
app.post('/admin/loyalty/rules', async (req, res) => {
    const { pointsPerOrder, bonusPointsAfterOrders } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO public.loyalty_rules (points_per_order, bonus_points_after_orders)
             VALUES ($1, $2)
             ON CONFLICT (loyalty_id) DO UPDATE
             SET points_per_order = $1, bonus_points_after_orders = $2, updated_at = CURRENT_TIMESTAMP
             RETURNING *`,
            [pointsPerOrder, bonusPointsAfterOrders]
        );

        res.status(200).json({ message: 'Loyalty rules updated successfully', rules: result.rows[0] });
    } catch (err) {
        console.error('Error updating loyalty rules:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// customer view their LoyaltyPoints
app.get('/loyalty/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query(
            `SELECT loyalty_points FROM public.users WHERE user_id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ userId, loyaltyPoints: result.rows[0].loyalty_points });
    } catch (err) {
        console.error('Error fetching loyalty points:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
