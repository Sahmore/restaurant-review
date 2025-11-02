// routes/reviews.js
const express = require('express');
const router = express.Router();

// Import controllers
const reviewController = require('../controllers/reviewController');

// GET /api/reviews - Get all reviews
router.get('/', reviewController.getReviews);

// GET /api/users/:userId/reviews - Get reviews for a user
// Frontend calls /api/users/:userId/reviews, so support that here by
// mapping the route param into the query expected by the controller.
router.get('/users/:userId/reviews', (req, res, next) => {
	req.query.userId = req.params.userId;
	return reviewController.getReviews(req, res, next);
});

// GET /api/reviews/:id - Get single review
router.get('/:id', reviewController.getReview);

// POST /api/reviews - Create new review
router.post('/', reviewController.createReview);

// PUT /api/reviews/:id - Update review
router.put('/:id', reviewController.updateReview);

// DELETE /api/reviews/:id - Delete review
router.delete('/:id', reviewController.deleteReview);

module.exports = router;