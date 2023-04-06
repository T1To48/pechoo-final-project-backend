import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js";
import asyncHandler from "../middlewares/asyncHandler.js";

import User from "../models/userModel.js";

export const register = asyncHandler(async (req,res,next) => {

    const {email,password}=req.body;
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    if(password.length<8){
      return next(new Error("password length cannot be less than 8 characters "))
    }
  const newUser = await User.create({
    ...req.body,
    password:hashedPassword,
  });
  
  if(newUser){
    res.status(200).json({
        success:true,
        data:newUser
  })
  }
  else{
    next(new Error("🚨🚨🚨 Error in 🚨 newUser 🚨 function"))
  }
});

export const login = asyncHandler(async (req,res,next)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            success:true,
            data:{
                ...user.toJSON(),
                token:generateToken(),
            }
        })
    }else {
        next(new Error("invalid credentials!"))
    }

})


