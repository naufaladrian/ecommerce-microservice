const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import CORS

const app = express();
const port = 3000;

app.use(cors()); // Menambahkan middleware CORS
app.use(express.json());

// Rute untuk root
app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API Gateway! Use /products, /cart, or /orders to interact with the services.');
});

// Rute untuk mendapatkan produk
app.get('/products', async (req, res) => {
    try {
        const response = await axios.get('http://product-service:3001/products');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// Rute untuk menambahkan produk
app.post('/products', async (req, res) => {
    try {
        const response = await axios.post('http://product-service:3001/products', req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding product' });
    }
});

// Rute untuk mendapatkan keranjang
app.get('/cart', async (req, res) => {
    try {
        const response = await axios.get('http://cart-service:3002/cart');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching cart' });
    }
});

// Rute untuk menambahkan item ke keranjang
app.post('/cart', async (req, res) => {
    try {
        const response = await axios.post('http://cart-service:3002/cart', req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding to cart' });
    }
});

// Rute untuk membuat pesanan
app.post('/orders', async (req, res) => {
    try {
        const response = await axios.post('http://order-service:3003/orders', req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating order' });
    }
});

app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});