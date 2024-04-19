const express = require('express');
const route = express.Router();
const controller = require('../controllers/admin_controller');
const fetchadmin = require('../middleware/isAdmin');

route.post('/admin_signup',controller.admin_signup);
route.post('/admin_login',controller.admin_login);
route.get('/get_admin',controller.get_admin);
route.patch('/edit_admin/:id',controller.update_admin);
route.patch('/change_password',fetchadmin,controller.change_password);
route.get('/check-login',fetchadmin,controller.check_login);
module.exports = route;
