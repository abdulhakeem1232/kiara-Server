const express = require('express')
const adminController = require('./../Controller/adminController')
const router = express.Router();

router.post('/register',adminController.createAdmin)
router.post('/login', adminController.loginAdmin);
router.post('/clientRegister',adminController.createClient)
router.post('/userRegister',adminController.createUser)
router.get('/clientlist',adminController.getClient)
router.get('/userlist',adminController.getUsers)
router.put('/updateclient/:clientId',adminController.updateClient)
router.delete('/deleteClient/:clientId',adminController.deleteClient)




module.exports = router;
