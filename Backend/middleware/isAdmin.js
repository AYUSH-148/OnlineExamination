
const isAdmin = (req, res, next) => {
    //  authentication middleware sets the user's role in req.user.role
    //Get the user from the jwt token and add id to req object
    const token = req.header('auth_token');
    if(!token){
      res.status(401).send({error:"Please authencticate using a valid token"})
    }
    next()
};
  
module.exports =  isAdmin ;
  