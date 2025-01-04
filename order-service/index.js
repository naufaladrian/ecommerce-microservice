const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3003;

const pool = new Pool({
    user: 'postgres',
    host: 'db_order',
    database: 'order_db',
    password: 'password',
    port: 5432,
});

app.use(express.json());

app.get('/orders', async (req, res) => {
    const result = await pool.query('SELECT * FROM orders');
    res.json(result.rows);
});

app.post('/orders', async (req, res) => {
    const { cartId } = req.body;
    const result = await pool.query('INSERT INTO orders(cart_id) VALUES($1) RETURNING *', [cartId]);
    res.status(201).json(result.rows[0]);
});

app.listen(port, () => {
    console.log(`Order service running on port ${port}`);
});