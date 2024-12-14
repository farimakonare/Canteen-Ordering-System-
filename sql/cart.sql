CREATE TABLE IF NOT EXISTS public.cart (
    cart_id SERIAL PRIMARY KEY,                                      
    user_id INTEGER NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE, 
    menu_item_id INTEGER NOT NULL REFERENCES public.menu(menu_id) ON DELETE CASCADE, 
    quantity INTEGER NOT NULL CHECK (quantity > 0),                  
    customization JSON DEFAULT '{}'::json NOT NULL,                  
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL  
);