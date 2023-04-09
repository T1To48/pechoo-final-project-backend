import asyncHandler from "../middlewares/asyncHandler.js";

import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

// @desc    update orderStatus to "Accepted" and adds orderId to driver's Model
// @route   PUT /delivery-app/v1/order/ready/:orderId
// @access  Private
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
      { $set: { driverId: driverId, orderStatus: "Accepted" } },
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
    success: true,
    data: order,
    driver,
  });
});

// @desc    update orderStatus and remove remainingTime field
// @route   PUT /delivery-app/v1/order/:driverId/accepted/:orderId
// @access  Private (Only userType:"Restaurant" )
export const updateOrderReady = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const order = await Order.findByIdAndUpdate(
    orderId,

    { $unset: { readyTime: 0 }, orderStatus: "Ready For Delivery" },
    { new: true, runValidators: true }
  );

  if (!order) {
    return next(new Error(`failed updating Status Order ${orderId}`));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});
