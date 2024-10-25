const express = require('express')
const adminController = require('./../Controller/adminController')
const router = express.Router();
const {isAuthenticated,authorizeRole} = require('../../middleware')

router.post('/register',adminController.createAdmin)
router.post('/login', adminController.loginAdmin);
router.post('/clientRegister',isAuthenticated,authorizeRole('admin'),adminController.createClient)
router.post('/userRegister',isAuthenticated,authorizeRole('admin'),adminController.createUser)
router.get('/clientlist',isAuthenticated,authorizeRole('admin'),adminController.getClient)
router.get('/userlist',isAuthenticated,authorizeRole('admin'),adminController.getUsers)
router.put('/updateclient/:clientId',isAuthenticated,authorizeRole('admin'),adminController.updateClient)
router.delete('/deleteClient/:clientId',isAuthenticated,authorizeRole('admin'),adminController.deleteClient)
router.put('/updateuser/:userId',isAuthenticated,authorizeRole('admin'),adminController.updateUser)
router.delete('/deleteUser/:userId',isAuthenticated,authorizeRole('admin'),adminController.deleteUser)
router.get('/dailymetrics',isAuthenticated,authorizeRole('admin'),adminController.dailyMetrics)
router.get('/weeklymetrics',isAuthenticated,authorizeRole('admin'),adminController.weeklyMetrics)
router.get('/monthlymetrics',isAuthenticated,authorizeRole('admin'),adminController.monthlyMetrics)






module.exports = router;
