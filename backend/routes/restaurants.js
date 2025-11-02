// routes/restaurants.js
const express = require('express');
const router = express.Router();

// Import controllers
const restaurantController = require('../controllers/restaurantController');

// GET /api/restaurants/search - Search restaurants
router.get('/search', restaurantController.searchRestaurants);

// GET /api/restaurants/featured - Featured restaurants (Lesotho sample)
// Place above parameterized routes to avoid being captured by '/:id'
router.get('/featured', restaurantController.getFeaturedRestaurants);

// GET /api/restaurants/:id/reviews - Get restaurant reviews from our platform
// Place more specific route before the generic '/:id'
router.get('/:id/reviews', restaurantController.getRestaurantReviews);

// GET /api/restaurants/:id - Get restaurant details
router.get('/:id', restaurantController.getRestaurant);

module.exports = router;