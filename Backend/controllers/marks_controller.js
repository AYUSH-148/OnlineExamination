const marks_db = require('../models/marks')
const { body, validationResult } = require('express-validator');

exports.update_marks = ([
    body('marks')
        .notEmpty().withMessage('Marks is required')],
    async (req, res) =>{
    try {
        let std_marks = await marks_db.findOne({
            student: req.std.id,
            subject: req.params.sub_id
        });

        if (!std_marks) {
            return res.status(404).send("Not Found");
        }
        let { marks, count_qns } = req.body;
        // Use $inc to increment the existing marks by the specified amount
        marks = await marks_db.findOneAndUpdate(
            {student:req.std.id ,subject:req.params.sub_id}, { $set: { marks , count_qns} }, { new: true }
        );
        res.status(200).json(marks);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
});

exports.set_marks = async (req, res) => {
    try {
        const { marks } = req.body;
        const student = req.std.id;
        const subject = req.params.sub_id;

        const existingRecord = await marks_db.findOne({ subject, student });

        if (existingRecord) {
                return res.status(400).json({ message: 'Record already exists' }); // Return a 400 Bad Request status
        }

        const newResponse = await marks_db.create({
            subject,
            student,
            marks
        });

        res.json(newResponse);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
};


//--------------------------------------------------------------------------------
exports.get_marksPerSub= async (req, res) => {
    try {
        let response = await marks_db.find({
            subject: req.params.sub_id
        });

        if (!response) {
            return res.status(404).send("Not Found");
        }

        res.status(200).json( response );
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
};

//-------------------------------------------------------------------------------
exports.get_marks = async(req,res)=>{
    try{
        // Fetch all marks records for the given student
        const marksRecords = await marks_db.find({student: req.std.id });
        res.json(marksRecords);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({
        message: error.message || "Internal Server Error"
      });
    }
    
}
exports.get_marksAllstds = async(req,res)=>{
    try{
        const marksRecords = await marks_db.find({ });
        res.json(marksRecords);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({
        message: error.message || "Internal Server Error"
      });
    }
    
}


