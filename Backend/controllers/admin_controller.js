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
    name:req.body.name,
    phoneNo:req.body.phoneNo,
    email: req.body.email,
    password: secPass,   
    profession:req.body.profession
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
        const admin = await admin_db.find({})
        res.status(200).json(admin);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            message: err.message || "Internal Server Error"
        })
    }
})

exports.update_admin=(async(req,res)=>{
    const { name,email,phoneNo, profession} = req.body;

    const data = {}
    if(name){
        data.name = name;}
    if(email){
        data.email = email;}
    if(phoneNo){
        data.phoneNo = phoneNo;}
    if(profession){
        data.profession = profession;
    }
   
    let admin = await admin_db.find({
        _id: req.params.id
    });

    if (!admin) {
        return res.status(404).send("Not Found");
    }
    try {
        new_admin  = await admin_db.findOneAndUpdate({_id:req.params.id},{$set:data},{new:true})
        res.status(200).json({"success":true,new_admin})   
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })       
    }
})
exports.change_password=(async(req,res)=>{

    const {   oldPassword , newPassword, confirmPassword} = req.body;
    console.log( oldPassword , newPassword, confirmPassword)
    const id = req.admin.id;
    
    const admin = await admin_db.findById(id);
    const passwordCompare = await bcrypt.compare(oldPassword,admin.password);
    if(!passwordCompare){
        return res.status(400).json({error:"Please write correct password"});
    }
    if( oldPassword === newPassword){
        return res.status(400).json({error:"Use different password"});

    }
    if(newPassword !==  confirmPassword){
        return res.status(400).json({error:"Password do not match"});
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    try {
        new_admin  = await admin_db.findOneAndUpdate({_id:id},{$set:{password: hashedPassword }},{new:true})
       
        res.status(200).json({"success":true,new_admin})   
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })       
    }
})

exports.check_login= (async (req, res) => {
    
    const id = req.admin.id;
    try {
        const admin= await admin_db.findById(id).select("-password");
        if(admin){
            return res.json({ success:true,admin});
        }
        else{
            return res.json({success: false});
        }
    } catch (error) {
            return res.status(400).json({ success:false,error: "User is not logged in" }); 
    }
   
    
})


