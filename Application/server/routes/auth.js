const express = require('express');
const router = express.Router();
const authController = require('../controller/user');

router.post('/register',authController.registerUser )
router.post('/login',authController.loginUser )
router.patch('/update/:id',authController.updateUser )
router.delete('/delete/:id',authController.deleteUser)
router.post('/logout/:id',authController.logoutUser );
// router.post('/user/:id',authController.getUserName);
router.get('/user/:id',authController.getUserById);

module.exports = router;