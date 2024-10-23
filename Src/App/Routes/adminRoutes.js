const express = require('express')
const adminController = require('./../Controller/adminController')
const router = express.Router();

router.post('/register',adminController.createAdmin)
router.post('/login', adminController.loginAdmin);
router.post('/clientRegister',adminController.createClient)
router.post('/userRegister',adminController.createUser)


module.exports = router;
