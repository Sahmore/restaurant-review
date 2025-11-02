/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
// routes/index.js
const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  });
});

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Restaurant Review Platform API',
    version: '1.0.0',
    endpoints: {
      reviews: '/api/reviews',
      restaurants: '/api/restaurants',
      health: '/api/health'
    }
  });
});

module.exports = router;