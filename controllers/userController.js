const user = require("../models/userSchema");
const bcrypt = require("bcrypt");
const validate = require("../config/validator");
const {generateToken} =require("../utils/generateToken");


const createUser = async (req, res) =>{
const {username, email, password} =req.body;
const valid=await validate({username, email, password});
if (valid) {
    const hashedPassword = await bcrypt.hash(valid.password, 10);
    const user =await user.create({
        username,
        email,
        password:hashedPassword,
    });
  if (user) {
    res.status(201).json({
    username:user.username,
    email:user.email,
    id:user._id,
    token:generateToken(user._id),
    
    });
  }
    res.status(201).json({
        message: "user created successfully",
        user,
    });
}else{
    res.status(400).json({
        message: "Invalid data",
    });
}
};
module.exports= {createUser,
}
