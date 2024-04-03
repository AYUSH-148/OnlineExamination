var jwt = require('jsonwebtoken');

// const dotenv = require('dotenv');
// dotenv.config({path:'config.env'});
const JWT_SECRET = "GandMara";
const isAdmin = (req, res, next) => {
  
  const token = req.header('auth_token');
  if (!token) {
    res.status(401).send({ error: "Please authencticate using a valid token" })
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    if (data.admin) {
      req.admin = data.admin;
    }
    else {
      return null;
    }

    next()
  } catch (error) {
    res.status(401).send({ error: "Please authencticate using a valid token" })
  }
};

module.exports = isAdmin;
