const express = require('express');
const route = express.Router();
const controller = require('../controllers/std_controller');
const fetchstd = require('../middleware/std_token');

route.post('/std_signup',controller.std_signup);
route.post('/std_login',controller.std_login);
route.get('/get_std',fetchstd,controller.get_std);
route.patch('/update_std',fetchstd,controller.update_std);
route.get('/get_all_stds',controller.get_all_stds);
route.patch('/s_change_password',fetchstd,controller.change_password);
route.post('/forgot_password',controller.forgot_password);
route.patch('/reset-password/:id/:token',controller.reset_password);
route.get('/check-login',fetchstd,controller.check_login);


module.exports = route;
