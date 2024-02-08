const admin_db = require('../models/admin')

const dotenv = require('dotenv');
dotenv.config({path:'config.env'});

const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken')

// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = "GandMara"
const bcrypt = require('bcryptjs');

//-----------------------------------------------------------------------
exports.admin_signup = ([
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast of 4 characters and cannot be blank').isLength({ min: 4 }).exists(),
], async (req, res) => {

let success = false;

const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}


//hashing and salt to make password access impossible
const salt = await bcrypt.genSalt(10);
const secPass = await bcrypt.hash(req.body.password,salt)

admin = await new admin_db({
    email: req.body.email,
    password: secPass,   
})

const data = {
    admin:{
        id:admin._id
    }
}
const auth_token=jwt.sign(data,JWT_SECRET);

admin
    .save(admin)
    .then(data => {
        success= true;
        res.status(200).json({success,auth_token,admin});
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Internal Server Error"
        })
    })
})

//-----------------------------------------------------------------------

exports.admin_login = ([
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast of 4 characters and cannot be blank').isLength({ min: 4 }).exists(),

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;


    try{
        let admin = await admin_db.findOne({email});
        let success=false;
        if(!admin){
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,admin.password);
        // (i.e., the passwords match), passwordCompare will be true.
        if(!passwordCompare){
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }
        const data = {
            admin:{
                id:admin._id
            }
        }
        const auth_token=jwt.sign(data,JWT_SECRET);

        success = true;
        res.json({success,auth_token,admin})
    }
    catch(error){
        console.error(error.message);
        res.status(500).send({
            message: err.message || "Internal Server Error"
        })
    }
})

//----------------------------------------------------------------------------
exports.get_admin=(async(req,res)=>{
    try {
        const admins = await admin_db.find({})
        res.send(admins);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            message: err.message || "Internal Server Error"
        })
    }
})

exports.admin_logout = ([
], async (req, res) => {
    try{
        let admin = await admin_db.findOne({email});
        let success=false;
        if(!admin){
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,admin.password);
        // (i.e., the passwords match), passwordCompare will be true.
        if(!passwordCompare){
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }
        const data = {
            admin:{
                id:admin._id
            }
        }
        const auth_token=jwt.sign(data,JWT_SECRET);

        success = true;
        res.json({success,auth_token,admin})
    }
    catch(error){
        console.error(error.message);
        res.status(500).send({
            message: err.message || "Internal Server Error"
        })
    }
})

