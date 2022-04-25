const jsonwebtoken = require("jsonwebtoken")
const user =require("../models/userSchema")

exports.protect= async function(req, res, next) {
let token;
if(req.headers.authorization ) {
    try{
        token = req.headers.authorization;
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await user.findById(decoded.id)
        next();
    }catch(err){
        res.status(400).json({
            message:"Invalid token"
        })
    }
    }
    if(!token){
        res.status(400).json({
            message:"you are not authorized"
        })
    }

};