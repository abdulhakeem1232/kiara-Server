const express = require('express')
const clientController = require('../Controller/clientController')
const router = express.Router();
const {isAuthenticated,authorizeRole} = require('../../middleware')

router.post('/login', clientController.loginClient);
router.get('/clientData/:email',isAuthenticated,authorizeRole('client'), clientController.clientData);






module.exports = router;
