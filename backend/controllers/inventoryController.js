const db = require('../config/db');

// Get all products
const getProducts = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add new product
const addProduct = async (req, res) => {
    const { name, quantity, min_stock_level, price, supplier_email } = req.body;
    try {
        await db.query(
            'INSERT INTO products (name, quantity, min_stock_level, price, supplier_email) VALUES (?, ?, ?, ?, ?)',
            [name, quantity, min_stock_level, price, supplier_email]
        );
        res.json({ message: 'Product added successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getProducts, addProduct };