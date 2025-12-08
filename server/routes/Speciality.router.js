const express = require('express');
const router = express.Router();
const specialityController = require('../controllers/speciality.controller');

router.get('/all', specialityController.getAllSpeciality);
router.post('/add', specialityController.createSpeciality);



module.exports = router;