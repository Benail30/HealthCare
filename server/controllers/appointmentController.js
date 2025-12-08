// controllers/todayapp.controller.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await prisma.todayapp.findMany();
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new appointment
// Create a new appointment
const createAppointment = async (req, res) => {
    const { name, date, time, type, image } = req.body;
    try {
      const newAppointment = await prisma.todayapp.create({
        data: {
          name,
          date,
          time,
          type,
          image,
        },
      });
      res.status(201).json(newAppointment);
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = { getAllAppointments, createAppointment };
