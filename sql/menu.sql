CREATE TABLE IF NOT EXISTS public.menu (
    menu_id SERIAL PRIMARY KEY,                
    name VARCHAR(255) NOT NULL,               
    price DOUBLE PRECISION NOT NULL,           
    category VARCHAR(100) NOT NULL,            
    customization_options JSON,                
    nutritional_info VARCHAR(255),            
    available BOOLEAN NOT NULL DEFAULT true    
);