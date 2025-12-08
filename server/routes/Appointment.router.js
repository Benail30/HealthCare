
const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/Appointment.controller');

router.get('/', AppointmentController.getAllAppointment);

router.get('/use/:userId', AppointmentController.getAppointmentByUserId);
router.get('/doc/:doctorId', AppointmentController.getAppointmentByDoctorId);

router.post('/', AppointmentController.createAppointment);
router.get('/day/:doctorId', AppointmentController.getdayAvailability);
router.post('/create', AppointmentController.createdayAvailability);
router.get('/all', AppointmentController.getAlldayAvailability);


module.exports = router;
