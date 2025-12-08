const router = require('express').Router();
const usercontroller = require("../controllers/usercontroller")

router.get('/all', usercontroller.getAllUsers)
router.get('/:id', usercontroller.getUserById)
router.put('/update/:id', usercontroller.updateUser)
router.delete('/delete', usercontroller.deleteUser)

module.exports = router;
