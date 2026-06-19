const express = require('express');
const { runInventoryAgent } = require('../controllers/aiController');
const router = express.Router();

router.get('/run-agent', runInventoryAgent);

module.exports = router;