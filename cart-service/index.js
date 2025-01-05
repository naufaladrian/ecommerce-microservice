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

// Default user ID
const defaultUserId = 21;

// Get cart items for a specific user
app.get('/cart', async (req, res) => {
    const userId = req.query.user_id || defaultUserId;
    const result = await pool.query('SELECT * FROM cart WHERE user_id = $1', [userId]);
    res.json(result.rows);
});

// Add item to cart for a specific user
app.post('/cart', async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.body.user_id || defaultUserId;
    const result = await pool.query(
        'INSERT INTO cart(user_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *',
        [userId, productId, quantity]
    );
    res.status(201).json(result.rows[0]);
});

// Delete item from cart for a specific user
app.delete('/cart/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.query.user_id || defaultUserId;
    const result = await pool.query('DELETE FROM cart WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
});

// Delete all items from cart for a specific user
app.delete('/cart/delete/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const result = await pool.query('DELETE FROM cart WHERE user_id = $1 RETURNING *', [user_id]);
    if (result.rowCount === 0) {
        return res.status(404).json({ error: 'No items found for this user' });
    }
    res.json({ message: 'All items deleted successfully' });
});

app.listen(port, () => {
    console.log(`Cart service running on port ${port}`);
});