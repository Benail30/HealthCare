
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios')

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await prisma.doctorr.findMany();
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createDoctor = async (req, res) => {
  const { name, gender, specialization, occupation, rating, image } = req.body;
  try {
    const newDoctor = await prisma.doctorr.create({
      data: {
        name,
        gender,
        specialization,
        occupation,
        rating,
        image,
      },
    });
    res.status(201).json(newDoctor);
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllDoctors, createDoctor };
