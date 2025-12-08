// routes/doctor.routes.js

const express = require('express');
const router = express.Router();
const { getAllDoctors, createDoctor } = require('../controllers/doctorinf.controller');

// Get all doctors
router.get('/', getAllDoctors);

// Create a new doctor
router.post('/', createDoctor);

module.exports = router;
