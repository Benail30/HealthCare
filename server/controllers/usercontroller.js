const prisma = require('../models/prisma');



const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'SERVER ERROR' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'SERVER ERROR' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: body,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found or no changes made' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'SERVER ERROR' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'SERVER ERROR' });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  getUserById,
  deleteUser
};