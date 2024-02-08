const express = require('express');
const route = express.Router();
const controller = require('../controllers/marks_controller');
const fetchadmin = require('../middleware/std_token');

route.patch('/update_marks/:sub_id',fetchadmin,controller.update_marks);
route.post('/set_marks/:sub_id',fetchadmin,controller.set_marks);
route.get('/get_marks/:sub_id',fetchadmin,controller.get_marksPerSub);
route.get('/get_marks',fetchadmin,controller.get_marks);
module.exports = route;
