const express = require('express');
const route = express.Router();
const controller = require('../controllers/admin_controller');
// const fetchadmin = require('../middleware/std_token');

route.post('/admin_signup',controller.admin_signup);
route.post('/admin_login',controller.admin_login);
route.get('/get_admin',controller.get_admin);
module.exports = route;
