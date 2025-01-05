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

// Get all orders for a specific user
app.get('/orders', async (req, res) => {
    const userId = req.query.user_id;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
    res.json(result.rows);
});

// Create a new order for a specific user
app.post('/orders', async (req, res) => {
    const { user_id, total_price } = req.body;
    if (!user_id || total_price === undefined) {
        return res.status(400).json({ error: 'User ID and total price are required' });
    }
    const result = await pool.query('INSERT INTO orders(user_id, total_price) VALUES($1, $2) RETURNING *', [user_id, total_price]);
    res.status(201).json(result.rows[0]);
});

app.listen(port, () => {
    console.log(`Order service running on port ${port}`);
});