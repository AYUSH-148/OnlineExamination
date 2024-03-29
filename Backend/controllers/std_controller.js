const std_db = require('../models/students')

const dotenv = require('dotenv');
dotenv.config({path:'config.env'});

const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken')

// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = "GandMara"

const bcrypt = require('bcryptjs');

//-----------------------------------------------------------------------
exports.std_signup = ([
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast of 4 characters and cannot be blank').isLength({ min: 4 }).exists(),
    body('rollNo')
        .isLength({ min: 6, max: 6 }).withMessage('RollNo must have a length of 6'),
    body('phoneNo')
        .isNumeric().withMessage('phoneNo must contain digits 0-9')
        .isLength({ min: 10, max: 10 }).withMessage('phoneNo must have a length of 10'),

], async (req, res) => {

let success = false;

const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}

// if same rollNo already exist
let std = await std_db.findOne({rollNo:req.body.rollNo});
if(std){
    return res.status(400).json({error:"Sorry student with this rollno already exists "})
}

//hashing and salt to make password access impossible
const salt = await bcrypt.genSalt(10);
const secPass = await bcrypt.hash(req.body.password,salt)

std = await new std_db({
    name: req.body.name,
    rollNo: req.body.rollNo,
    email: req.body.email,
    password: secPass,  
    phoneNo: req.body.phoneNo,
    role: req.body.role
})

const data = {
    std:{
        id:std._id
    }
}
const auth_token=jwt.sign(data,JWT_SECRET);

std
    .save(std)
    .then(data => {
        success= true;
        res.status(200).json({success,auth_token,std});
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Internal Server Error"
        })
    })
})

//-----------------------------------------------------------------------

exports.std_login = ([
    body('password', 'Password cannot be blank').exists(),
    body('rollNo', 'rollno cannot be blank').exists(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {rollNo,password} = req.body;


    try{
        let std = await std_db.findOne({rollNo});
        let success=false;
        if(!std){
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,std.password);
        // (i.e., the passwords match), passwordCompare will be true.
        if(!passwordCompare){
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }
        const data = {
            std:{
                id:std._id
            }
        }
        const auth_token=jwt.sign(data,JWT_SECRET);

        success = true;
        res.json({success,auth_token,std})
    }
    catch(error){
        console.error(error.message);
        res.status(500).send({
            message: err.message || "Internal Server Error"
        })
    }
})

//----------------------------------------------------------------------------

exports.get_all_stds=(async(req,res)=>{
    try {
        const std = await std_db.find({})
        res.send(std);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            message: err.message || "Internal Server Error"
        })
    }
})

//----------------------------------------------------------------------

exports.get_std=(async(req,res)=>{
    try {
        student= req.std.id;
        const std= await std_db.findById(student).select("-password");
        res.send(std);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
})

//-------------------------------------------------------------------
exports.update_std=(async(req,res)=>{
    const { name,email,phoneNo, rollNo} = req.body;

    const data = {}
    if(name){
        data.name = name;}
    if(email){
        data.email = email;}
    if(phoneNo){
        data.phoneNo = phoneNo;}
    if(rollNo){
        data.rollNo = rollNo;
    }
   
    let std = await std_db.find({
        _id: req.std.id
    });

    if (!std) {
        return res.status(404).send("Not Found");
    }
    try {
        new_std  = await std_db.findOneAndUpdate({_id:req.std.id},{$set:data},{new:true})
        res.status(200).json({"success":true,new_std})   
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })       
    }
})