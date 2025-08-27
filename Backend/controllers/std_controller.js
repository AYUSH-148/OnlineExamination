const std_db = require('../models/students')

const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });

const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken')

const JWT_SECRET = "kdfmnaonm";


const bcrypt = require('bcryptjs');
var nodemailer = require("nodemailer");

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
    let std = await std_db.findOne({ rollNo: req.body.rollNo });
    if (std) {
        return res.status(400).json({ error: "Sorry student with this rollno already exists " })
    }

    //hashing and salt to make password access impossible
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)

    std = await new std_db({
        name: req.body.name,
        rollNo: req.body.rollNo,
        email: req.body.email,
        password: secPass,
        phoneNo: req.body.phoneNo,
        role: req.body.role
    })

    const data = {
        std: {
            id: std._id
        }
    }
    const auth_token = jwt.sign(data, JWT_SECRET);

    std
        .save(std)
        .then(data => {
            success = true;
            res.status(200).json({ success, auth_token, std });
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

    const { rollNo, password } = req.body;


    try {
        let std = await std_db.findOne({ rollNo });
        let success = false;
        if (!std) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, std.password);
        // (i.e., the passwords match), passwordCompare will be true.
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        const data = {
            std: {
                id: std._id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({ success, auth_token, std })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send({
            message: err.message || "Internal Server Error"
        })
    }
})

//----------------------------------------------------------------------------

exports.get_all_stds = (async (req, res) => {
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

exports.get_std = (async (req, res) => {
    try {
        if (req.std.id) {
            student = req.std.id;
            const std = await std_db.findById(student).select("-password");
            res.send(std);
        }
        else {
            return res.status(400).json({ error: "Sorry cant find student " })
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
})

//-------------------------------------------------------------------
exports.update_std = (async (req, res) => {
    const { name, email, phoneNo, rollNo } = req.body;

    const data = {}
    if (name) {
        data.name = name;
    }
    if (email) {
        data.email = email;
    }
    if (phoneNo) {
        data.phoneNo = phoneNo;
    }
    if (rollNo) {
        data.rollNo = rollNo;
    }

    let std = await std_db.find({
        _id: req.std.id
    });

    if (!std) {
        return res.status(404).send("Not Found");
    }
    try {
        new_std = await std_db.findOneAndUpdate({ _id: req.std.id }, { $set: data }, { new: true })
        res.status(200).json({ "success": true, new_std })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
})
exports.change_password = (async (req, res) => {

    const { oldPassword, newPassword, confirmPassword } = req.body;
    const id = req.std.id;

    const std = await std_db.findById(id);
    const passwordCompare = await bcrypt.compare(oldPassword, std.password);
    if (!passwordCompare) {
        return res.status(400).json({ error: "Please write correct password" });
    }
    if (oldPassword === newPassword) {
        return res.status(400).json({ error: "Use different password" });

    }
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "Password do not match" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    try {
        new_std = await std_db.findOneAndUpdate({ _id: id }, { $set: { password: hashedPassword } }, { new: true })
        res.status(200).json({ success: true, new_std });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
})
exports.forgot_password = (async (req, res) => {
    const { email } = req.body;
    console.log("inside1",email)
    try {
        const user = await std_db.findOne({ email });
        if (!user) {
            return res.json({ status: "User Not Exists!!" });
        }
        const secret = process.env.JWT_SECRET; // Use a proper secret key for JWT signing
        const token = jwt.sign({ email: user.email, id: user._id }, secret, {
            expiresIn: "1h", // Adjust token expiration as needed
        });
        const link = `http://localhost:3000/reset-password/${user._id}/${token}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "ayushpro111@gmail.com",
                pass: "nenf aydk igte qkhl",
            },
        });

        const mailOptions = {
            from: "ayushpro111@gmail.com",
            to: email, 
            subject: "Password Reset",
            text: `Please click on the following link to reset your password: ${link}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Error sending email" });
            } else {
                console.log("Email sent: " + info.response);
                return res.json({ success:true,status: "Email sent successfully" });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})
exports.reset_password = (async (req, res) => {
    
    const  {token,id}  = req.params;
    const { newPassword,confirmPassword } = req.body;
  
    const oldUser = await std_db.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    try {

      if(newPassword!==confirmPassword){
        return res.status(400).json({ error: "Passwords don't match" });
      }
      if(oldUser.password === newPassword){
        return res.status(400).json({ error: "Create new password" });
      }
     
      const encryptedPassword = await bcrypt.hash(newPassword, 10);
      const std = await std_db.findOneAndUpdate({ _id: id }, { $set: { password: encryptedPassword } }, { new: true })
      return res.json({ success:true,std });
  
    } catch (error) {
      console.log(error);
      res.json({ status: "Something Went Wrong" });
    }
})
exports.check_login= (async (req, res) => {
    
    const id = req.std.id;
    try {
        const std = await std_db.findById(id).select("-password");
        if(std){
            return res.json({ success:true,std});
        }
        else{
            return res.json({success: false});
        }
    } catch (error) {
            return res.status(400).json({ success:false,error: "User is not logged in" }); 
    }
   
    
})



