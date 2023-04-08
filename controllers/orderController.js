import asyncHandler from "../middlewares/asyncHandler.js";

import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

import { isRestaurant } from "../helpers/isRestaurant.js";

export const addOrder = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;

  if (await isRestaurant(userId)) {
    return next(new Error("Only Restaurants Allowed, to publish new orders"));
  }

  const order = { ...req.body, restaurantId: userId };

  const newOrder = await Order.create(order);
  if (!newOrder) {
    return next(new Error("Error adding New Order"));
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $push: { orders: newOrder.id } },
    { new: true, runValidators: true }
  );
  if (!user) {
    return next(new Error("Error Updating User Orders"));
  }

  res.status(200).json({
    success: true,
    data: newOrder,
  });
});

export const deleteOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  // if(await isRestaurant(userId)){
  //     return next(new Error("Only Restaurants Allowed, to delete orders"))
  // }

  const deletedOrder = await Order.deleteOne({ _id: orderId });
  if (!deletedOrder) {
    return next(new Error("invalid Order Id"));
  }

  const updateUsers = await User.updateMany(
    { orders: { $in: [orderId] } },
    { $pull: { orders: orderId } },
    { new: true, runValidators: true }
  );
  if (!updateUsers) {
    return next(new Error("failed deleting order ID, from Users"));
  }

  res.status(200).json({
    success: true,
    data: {
      deletedOrder: deletedOrder,
      updatedUsers: updateUsers,
    },
  });
});
