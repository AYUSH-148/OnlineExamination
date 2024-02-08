const marksPerQn_db = require('../models/marksPerQn')
const { body, validationResult } = require('express-validator');

exports.update_marksPerQn = ([
    body('marks').notEmpty().withMessage('Marks is required')],
    async (req, res) => {
    try {
        let std_marks = await marksPerQn_db.findOne({
            student: req.std.id,
            subject: req.params.sub_id,
            question: req.params.qn_id
        });

        if (!std_marks) {
            return res.status(404).send("Not Found");
        }

        let { marks } = req.body;

        // Use $set to set the marks to the specified value
        marks = await marksPerQn_db.findOneAndUpdate(
            { student: req.std.id, subject: req.params.sub_id, question: req.params.qn_id },
            { $set: { marks } },
            { new: true }
        );
        
        res.status(200).json(marks);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
});

exports.set_marksPerQn = async (req, res) => {
    const { marks } = req.body;
    try {
        const {marks} = req.body;
        const student = req.std.id;
        const subject = req.params.sub_id;
        const question = req.params.qn_id;
        const existingRecord = await marksPerQn_db.findOne({ subject, student,question });

        if (existingRecord) {
            return res.status(400).json({ message: 'Record already exists' }); 
        }
        const newResponse = await marksPerQn_db.create({
            subject: req.params.sub_id,
            student: req.std.id,
            question: req.params.qn_id,
            marks: marks
        });
        res.json(newResponse);
    } catch (error) {
        
            console.error('Error:', error.message);
            res.status(500).send({
                message: error.message || "Internal Server Error"})
          
    }
};


//--------------------------------------------------------------------------------
exports.get_marksPerQn= async (req, res) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 100));
        let response = await marksPerQn_db.findOne({
            student: req.std.id,
            subject: req.params.sub_id,
            question: req.params.qn_id
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

//-------------------------------------------------------------------------------
exports.get_marksPerSub = async(req,res)=>{
    try{
        // Fetch all marks records for the given student
        
        const marksRecords = await marksPerQn_db.find({ student: req.std.id , subject: req.params.sub_id});

        // Calculate total marks by summing up the 'marks' field in each record
        const totalMarks = marksRecords.reduce((sum, record) => sum + record.marks, 0);
        console.log({"std":req.std.id,"sub": req.params.sub_id});
        console.log(totalMarks);
        res.json({ totalMarks });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({
        message: error.message || "Internal Server Error"
      });
    }
    
}


