const express = require('express');
const route = express.Router();
const controller = require('../controllers/attempt_controller');
// const fetchadmin = require('../middleware/std_token');

route.post('/create_attempt',controller.create_attempt);
route.patch('/change_attempt/:std_id/:sub_id',controller.change_attempt);
route.get('/get_attempt/:std_id/:sub_id',controller.get_attempt);
route.get('/getAttempts/:std_id',controller.getAttempts_per_std);
module.exports = route;
