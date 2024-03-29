const express = require('express');
const route = express.Router();
const controller = require('../controllers/sub_controller');

const isAdmin = require('../middleware/isAdmin');

route.post('/create_sub',isAdmin,controller.create_sub);
route.get('/get_all_sub',controller.get_all_sub);
route.delete('/delete_sub/:id',isAdmin,controller.delete_sub);
route.get('/get_sub/:id',controller.get_sub);
route.put('/update_sub/:id',isAdmin,controller.update_sub);

module.exports = route;
