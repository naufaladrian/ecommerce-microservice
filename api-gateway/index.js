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

// Rute untuk mendapatkan semua produk
app.get('/products', async (req, res) => {
    try {
        const response = await axios.get('http://product-service:3001/products');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// Rute untuk mendapatkan detail produk berdasarkan ID
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`http://product-service:3001/products/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching product details' });
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

// Rute untuk mengupdate produk berdasarkan ID
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.put(`http://product-service:3001/products/${id}`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating product' });
    }
});

// Rute untuk menghapus produk berdasarkan ID
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.delete(`http://product-service:3001/products/${id}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting product' });
    }
});

// Rute untuk mendapatkan keranjang berdasarkan user_id
app.get('/cart', async (req, res) => {
    const userId = req.query.user_id;
    try {
        const response = await axios.get(`http://cart-service:3002/cart?user_id=${userId}`);
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

// Rute untuk menghapus item dari keranjang berdasarkan ID
app.delete('/cart/:id', async (req, res) => {
    const userId = req.query.user_id;
    try {
        const response = await axios.delete(`http://cart-service:3002/cart/${req.params.id}?user_id=${userId}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting item from cart' });
    }
});

// Rute untuk menghapus semua item dari keranjang berdasarkan user_id
app.delete('/cart/delete/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const response = await axios.delete(`http://cart-service:3002/cart/delete/${user_id}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting all items from cart' });
    }
});

// Rute untuk membuat pesanan
app.post('/orders', async (req, res) => {
    try {
        const { user_id, total_price } = req.body;
        if (!user_id || total_price === undefined) {
            return res.status(400).json({ error: 'User ID and total price are required' });
        }
        const response = await axios.post('http://order-service:3003/orders', { user_id, total_price });
        if (response.status === 201) {
            // Hapus semua item dari keranjang setelah pesanan berhasil dibuat
            await axios.delete(`http://cart-service:3002/cart/delete/${user_id}`);
        }
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating order' });
    }
});

// Rute untuk mendapatkan pesanan berdasarkan user_id
app.get('/orders', async (req, res) => {
    const userId = req.query.user_id;
    try {
        const response = await axios.get(`http://order-service:3003/orders?user_id=${userId}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching orders' });
    }
});

app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});