const express = require('express')
const userController = require('../Controller/userController')
const router = express.Router();


router.post('/login', userController.loginUser);
router.get('/userData/:email', userController.userData);






module.exports = router;
