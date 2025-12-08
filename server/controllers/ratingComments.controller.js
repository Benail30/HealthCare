const prisma = require('../models/prisma');

// Get all reviews with user ID
const getReviewsByUserId = async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const userReviews = await prisma.ratingsComment.findMany({ 
            where: { userId },
            include: { user: true }
        });
        res.json(userReviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};
const getAll = async (req, res) => {
    try {
        const userReviews = await prisma.ratingsComment.findMany({ include: { user: true } });
        res.json(userReviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};

// Get all reviews with doctor ID
const getReviewsByDoctorId = async (req, res) => {
    const doctorId = parseInt(req.params.doctorId);
    try {
        // Get reviews for users who are doctors
        const doctorReviews = await prisma.ratingsComment.findMany({
            where: {
                user: {
                    doctorId: doctorId
                }
            },
            include: { user: true }
        });
        res.json(doctorReviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};

// Add a new review
const addReview = async (req, res) => {
    const { userId, rating, review, name, imageSrc } = req.body;
    try {
        const newReview = await prisma.ratingsComment.create({ 
            data: { userId: parseInt(userId), rating, review, name, imageSrc }
        });
        res.json(newReview);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to add review' });
    }
};

module.exports = {
    getReviewsByUserId,
    getReviewsByDoctorId,
    addReview,
    getAll
};
