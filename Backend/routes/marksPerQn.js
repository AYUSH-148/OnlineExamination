const express = require('express');
const route = express.Router();
const controller = require('../controllers/marksPerQn_controller');
const std_token = require('../middleware/std_token');

route.patch('/update_marksPerQn/:sub_id/:qn_id',std_token,controller.update_marksPerQn);
route.post('/set_marksPerQn/:sub_id/:qn_id',std_token,controller.set_marksPerQn);
route.get('/get_marksPerStd',std_token,controller.get_marksPerStd);
module.exports = route;
