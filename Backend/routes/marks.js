const express = require('express');
const route = express.Router();
const controller = require('../controllers/marks_controller');
const fetch_student = require('../middleware/std_token');

route.patch('/update_marks/:sub_id',fetch_student,controller.update_marks);
route.post('/set_marks/:sub_id',fetch_student,controller.set_marks);
route.get('/get_marks/:sub_id',controller.get_marksPerSub);
route.get('/get_marks',fetch_student,controller.get_marks);
route.get('/get_marksAll',controller.get_marksAllstds );
module.exports = route;
