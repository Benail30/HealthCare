// controllers/userReview.controller.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all user reviews
const getAllUserReviews = async (req, res) => {
  try {
    const userReviews = await prisma.userReview.findMany();
    res.json(userReviews);
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new user review
const createUserReview = async (req, res) => {
  const { name, occupation, review, rating, image } = req.body;
  try {
    const newUserReview = await prisma.userReview.create({
      data: {
        name,
        occupation,
        review,
        rating,
        image,
      },
    });
    res.status(201).json(newUserReview);
  } catch (error) {
    console.error('Error creating user review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllUserReviews, createUserReview };
