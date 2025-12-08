const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios')


const getAllPatients = async (req, res) => {
  try {
    const patients = await prisma.patient.findMany();
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addPatient = async (req, res) => {
    try {
      const newPatient = await prisma.patient.create({
        data: req.body,
      });
      res.status(201).json(newPatient);
    } catch (error) {
      console.error('Error adding patient:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPatient = await prisma.patient.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(deletedPatient);
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllPatients, addPatient, deletePatient };
