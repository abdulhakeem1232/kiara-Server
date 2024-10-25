const express = require('express')
const userController = require('../Controller/userController')
const router = express.Router();
const {isAuthenticated,authorizeRole} = require('../../middleware')

router.post('/login', userController.loginUser);
router.get('/userData/:email', isAuthenticated,authorizeRole('user'),userController.userData);






module.exports = router;
