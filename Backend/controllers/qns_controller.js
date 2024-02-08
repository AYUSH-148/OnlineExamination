const qns_db = require('../models/questions')
const { body, validationResult } = require('express-validator');

//------------------------------------------------------------------
exports.get_all_qns = (async (req, res) => {
    try {
        let qns = await qns_db.find({
            subject: req.params.sub_id
        });
        res.json(qns);       
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    } 
});


//------------------------------------------------------------------
exports.create_qns = [
        body('options').isArray().withMessage('Options must be an array'),
    body('options.*.text', 'Text is required for each option').isString().notEmpty(),
    body('options.*.isCorrect', 'isCorrect must be a boolean').isBoolean(),
    async (req, res) => {

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Your code to create the question
        try {
            const newQuestion = await qns_db.create({
                subject: req.params.sub_id,
                qn: req.body.qn,
                options: req.body.options,
            });
            res.json({"success":true,newQuestion});
        } catch (error) {
            res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    }
];


//--------------------------------------------------------------------------------
exports.delete_qn = async (req, res) => {
    try {
     
        let qns = await qns_db.findOneAndDelete({
            _id: req.params.qn_id,
            subject: req.params.sub_id
        });

        if (!qns) {
            return res.status(404).send("Not Found");
        }

        res.status(200).json({ "msg":"Success", qns });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
};
//----------------------------------------------------------------
exports.update_qn = ([
    body('options').isArray().withMessage('Options must be an array'),
    body('options.*.text', 'Text is required for each option').isString().notEmpty(),
    body('options.*.isCorrect', 'isCorrect must be a boolean').isBoolean(),
],async(req,res) => {

    const { qn,options} = req.body;
    const newqn = {};

    if(qn){
        newqn.qn = qn;}
    if(options){
        newqn.options = options;}
   
    let question = await qns_db.find({
        subject: req.params.sub_id,
        _id: req.params.qn_id
    });

    if (!question) {
        return res.status(404).send("Not Found");
    }
    try {
        question  = await qns_db.findOneAndUpdate({subject:req.params.sub_id, _id:req.params.qn_id},{$set:newqn},{new:true})
        res.status(200).json({"success":true,question})   
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })       
    }
})

