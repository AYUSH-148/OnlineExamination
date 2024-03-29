const express = require('express');
const route = express.Router();
const controller = require('../controllers/qns_controller');
const isAdmin= require('../middleware/isAdmin');

route.post('/create_qns/:sub_id',isAdmin,controller.create_qns);
route.delete('/delete_qn/:sub_id/:qn_id',isAdmin,controller.delete_qn);
route.get('/qns/:sub_id',controller.get_all_qns);
route.put('/update_qn/:sub_id/:qn_id',isAdmin,controller.update_qn);

module.exports = route;
