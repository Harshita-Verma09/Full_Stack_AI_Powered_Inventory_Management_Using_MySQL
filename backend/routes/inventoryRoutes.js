const express = require('express');
const { getProducts, addProduct } = require('../controllers/inventoryController');
const router = express.Router();

router.get('/', getProducts);
router.post('/', addProduct);

module.exports = router;