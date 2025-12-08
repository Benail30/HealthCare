const express = require('express');
const router = express.Router();
const { register, login ,getUser} = require('../controllers/login');
const verifyToken=require('../middleware/verify')

router.post('/register', register);
router.post('/login', login);
router.get('/getuser',verifyToken, getUser);


module.exports = router;
