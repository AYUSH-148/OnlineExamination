const sub_db = require('../models/subjects')
const { body, validationResult } = require('express-validator');

//------------------------------------------------------------------
exports.get_all_sub = (async (req, res) => {
    try {
        const sub = await sub_db.find({ });
        res.json(sub);       
    } catch (error) {
        res.status(500).send({
            message: err.message || "Internal Server Error"
        })
    } 
})

//------------------------------------------------------------------
exports.create_sub = ([
    body('code', 'Enter a valid code').isLength({ min: 2 }),
    body('name', 'Description must be of atleast 3 characters').isLength({ min: 3 }),
], async (req, res) => {

    //if there are errors return bad requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { code,name} = req.body;
    const sub = await new sub_db({
        code , name
    })
    sub
        .save(sub)
        .then(data => {
            res.status(200).json({success:true,sub});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Internal Server Error"
            })
        })
})


//--------------------------------------------------------------------------------
exports.delete_sub = async (req, res) => {
    try {
        let sub = await sub_db.findById(req.params.id);

        if (!sub) {
            return res.status(404).send("Not Found");
        }

        sub = await sub_db.findByIdAndDelete(req.params.id);
        if (!sub) {
            return res.status(404).send("Not Found"); // In case deletion failed
        }

        res.status(200).json({ msg: "Success", sub });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
};
