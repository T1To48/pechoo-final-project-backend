import asyncHandler from "../middlewares/asyncHandler.js";

import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

import { isRestaurant } from "../helpers/isRestaurant.js";






  export const updateOrderAccepted = asyncHandler(async (req, res, next) => {
    const { orderId, driverId } = req.params;
  
    const [driver, order] = await Promise.all([
      User.findByIdAndUpdate(
        driverId,
        { $addToSet: { orders: orderId } },
        { new: true, runValidators: true }
      ),
      Order.findByIdAndUpdate(
        orderId,
        { $set: { driverId: driverId , orderStatus: "Accepted" }},
        { new: true, runValidators: true }
      ),
    ]);
  
  
    if (!driver) {
      return next(new Error(`failed to update , Order ${orderId}`));
    }
    if (!order) {
      return next(new Error(`failed to update , Driver ${driverId}`));
    }
  
    res.status(200).json({
      success:true,
      data:order,
      driver
    })
  });
  

  export const updateOrderReady=asyncHandler(async(req,res,next)=>{
    const {orderId}=req.params;
    const order=await Order.findByIdAndUpdate(orderId,
      
      {$unset:{readyTime:0},orderStatus:"Ready For Delivery"},
      { new: true, runValidators: true }
      )
  
      if(!order){
        return next(new Error(`failed updating Status Order ${orderId}`))
      }
  
      res.status(200).json({
        success:true,
        data:order
      })
  })