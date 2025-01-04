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

app.post('/products', async (req, res) => {
    const { name, price } = req.body;
    const result = await pool.query('INSERT INTO products(name, price) VALUES($1, $2) RETURNING *', [name, price]);
    res.status(201).json(result.rows[0]);
});

app.listen(port, () => {
    console.log(`Product service running on port ${port}`);
});