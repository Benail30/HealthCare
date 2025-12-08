const prisma = require('../models/prisma');

const getAllComments = async (req, res) => {
    try {
        const Comments = await prisma.comment.findMany({ include: { blog: true } });
        res.status(200).json(Comments);
    } catch (error) {
        console.error('Error fetching Comments:', error);
        res.status(500).json({ error: 'Failed to fetch Comments' });
    }
}

const getcommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await prisma.comment.findUnique({ 
            where: { id: parseInt(id) },
            include: { blog: true }
        });
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ error: 'comment not found' });
        }
    } catch (error) {
        console.error('Error fetching comment:', error);
        res.status(500).json({ error: 'Failed to fetch comment' });
    }
}

const createcomment = async (req, res) => {
    try {
        const comment = await prisma.comment.create({ data: req.body });
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Failed to create comment' });
    }
}
const updatecomment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await prisma.comment.update({
            where: { id: parseInt(id) },
            data: req.body
        });
        res.status(200).json(comment);
    } catch (error) {
        console.error('Error updating comment:', error);
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'comment not found' });
        } else {
            res.status(500).json({ error: 'Failed to update comment' });
        }
    }
}

const deletecomment = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.comment.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: 'comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'comment not found' });
        } else {
            res.status(500).json({ error: 'Failed to delete comment' });
        }
    }
}

module.exports = {
    getAllComments,
    createcomment,
    getcommentById,
    updatecomment,
    deletecomment

}
