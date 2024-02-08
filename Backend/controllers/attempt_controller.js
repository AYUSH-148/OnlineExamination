const isAttempted_db = require('../models/isAttempted')
const { body, validationResult } = require('express-validator');

//------------------------------------------------------------------
exports.get_all_attempts = (async (req, res) => {
    try {
        let response = await isAttempted_db.find({});
        res.json(response);       
    } catch (error) {
        res.status(500).send({
            message: err.message || "Internal Server Error"
        })
    } 
})

//--------------------------------------------------------------------------------
exports.get_attempt= async (req, res) => {
    try {
        let response = await isAttempted_db.findOne({
            student: req.params.std_id,
            subject: req.params.sub_id
        });

        if (!response) {
            return res.status(404).send("Not Found");
        }

        res.status(200).json({ response });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
};


//------------------------------------------------------------------
exports.create_attempt = ([
        body('isAttempted').isBoolean().withMessage("It should be bool")],
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {student,subject,isAttempted} = req.body;
        // Your code to create the question
        try {
            const newResponse = await isAttempted_db.create({
                student,subject,isAttempted
            });
            res.json(newResponse);
        } catch (error) {
            res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    }
)
//---------------------------------------------------------------------------



exports.change_attempt = [
    body('isAttempted').isBoolean().withMessage("It should be a boolean"),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { isAttempted } = req.body;

        try {
            let response = await isAttempted_db.findOneAndUpdate(
                { student: req.params.std_id, subject: req.params.sub_id },
                { $set: { isAttempted } },
                { new: true }
            );

            if (!response) {
                return res.status(404).send("Not Found");
            }

            res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            res.status(500).send({
                message: error.message || "Internal Server Error"
            });
        }
    }
];




