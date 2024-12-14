CREATE TABLE IF NOT EXISTS public.orders (
    order_id SERIAL PRIMARY KEY,                       
    user_id INTEGER NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE, 
    menu_items JSON NOT NULL,                          
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'canceled')), 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL 
);