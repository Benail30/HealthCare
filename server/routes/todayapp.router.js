// routes/appointment.routes.js

const express = require('express');
const router = express.Router();
const { getAllAppointments, createAppointment } = require('../controllers/appointmentController');

router.get('/', getAllAppointments);

router.post('/',createAppointment);

module.exports = router;
