CREATE TABLE IF NOT EXISTS cart (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL
);