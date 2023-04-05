import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js";
import asyncHandler from "../middlewares/asyncHandler.js";

import Restaurant from "../models/restaurantModel.js";

export const addRestaurant = asyncHandler(async (req,res,next) => {

    const {email,password}=req.body;

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

  const newRestaurant = await Restaurant.create({
    email,
    password:hashedPassword,
  });
  
  if(newRestaurant){
    res.status(200).json({
        success:true,
        data:newRestaurant
  })
  }
  else{
    next(new Error("🚨🚨🚨 Error in 🚨 newRestaurant 🚨 function"))
  }
});

export const restaurantLogin = asyncHandler(async (req,res,next)=>{
    const {email,password}=req.body;
    const restaurant=await Restaurant.findOne({email});
    if(restaurant && (await bcrypt.compare(password,restaurant.password))){
        res.status(200).json({
            success:true,
            data:{
                ...restaurant,
                token:generateToken(),
            }
        })
    }else {
        next(new Error("invalid credentials!"))
    }

})


