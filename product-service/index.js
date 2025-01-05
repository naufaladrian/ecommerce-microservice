const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3001;

const pool = new Pool({
    user: 'postgres',
    host: 'db_product',
    database: 'product_db',
    password: 'password',
    port: 5432,
});

app.use(express.json());

app.get('/products', async (req, res) => {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
});

app.post('/products', async (req, res) => {
    const { name, price } = req.body;
    const result = await pool.query('INSERT INTO products(name, price) VALUES($1, $2) RETURNING *', [name, price]);
    res.status(201).json(result.rows[0]);
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const result = await pool.query('UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *', [name, price, id]);
    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
});

app.listen(port, () => {
    console.log(`Product service running on port ${port}`);
});