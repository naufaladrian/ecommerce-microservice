const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3002;

const pool = new Pool({
    user: 'postgres',
    host: 'db_cart',
    database: 'cart_db',
    password: 'password',
    port: 5432,
});

app.use(express.json());

app.get('/cart', async (req, res) => {
    const result = await pool.query('SELECT * FROM cart');
    res.json(result.rows);
});

app.post('/cart', async (req, res) => {
    const { productId, quantity } = req.body;
    const result = await pool.query('INSERT INTO cart(product_id, quantity) VALUES($1, $2) RETURNING *', [productId, quantity]);
    res.status(201).json(result.rows[0]);
});

app.listen(port, () => {
    console.log(`Cart service running on port ${port}`);
});