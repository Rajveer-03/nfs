const express = require('express');
const router = express.Router();
const { postAppointment } = require('../controllers/appointmentController');

router.post('/postappointment', postAppointment);

module.exports = router;
