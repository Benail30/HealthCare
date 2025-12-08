const express = require('express');
const router = express.Router();
const { getAllUserReviews, createUserReview } = require('../controllers/review.controller');

// Route to get all reviews
router.get('/', getAllUserReviews);

// Route to add a new review
router.post('/', createUserReview);

module.exports = router;
