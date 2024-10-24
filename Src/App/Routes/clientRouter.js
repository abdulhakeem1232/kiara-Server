const express = require('express')
const clientController = require('../Controller/clientController')
const router = express.Router();


router.post('/login', clientController.loginClient);
router.get('/clientData/:email', clientController.clientData);






module.exports = router;
