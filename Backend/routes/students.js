const express = require('express');
const route = express.Router();
const controller = require('../controllers/std_controller');
const fetchstd = require('../middleware/std_token');

route.post('/std_signup',controller.std_signup);
route.post('/std_login',controller.std_login);
route.get('/get_std',fetchstd,controller.get_std);
route.get('/get_all_stds',controller.get_all_stds);

module.exports = route;
