CREATE TABLE IF NOT EXISTS public.loyalty_rules (
    loyalty_id SERIAL PRIMARY KEY,                
    points_per_order INTEGER NOT NULL DEFAULT 1 CHECK (points_per_order > 0), 
    bonus_points_after_orders INTEGER NOT NULL DEFAULT 3 CHECK (bonus_points_after_orders > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
