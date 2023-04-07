import asyncHandler from "../middlewares/asyncHandler.js";

import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

import { isRestaurant } from "../helpers/isRestaurant.js";

export const addOrder=asyncHandler(async(req,res,next)=>{    
    const userId=req.params.userId; 

    if(await isRestaurant(userId)){
        return next(new Error("Only Restaurants Allowed, to publish new orders"))
    }


    const newOrder=await Order.create(req.body);
    if(!newOrder){
        return next(new Error("Error adding New Order"))
    }

    
    const user=await User.findByIdAndUpdate(
        userId,
        {$push:{orders:newOrder.id}},
        {new:true, runValidators:true}
    )
if(!user){
    return next(new Error("Error Updating User Orders"))
}

res.status(200).json({
    success:true,
    data:newOrder
})
})






