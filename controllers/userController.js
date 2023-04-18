import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import asyncHandler from "../middlewares/asyncHandler.js";

import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

import { isRestaurant } from "../helpers/isRestaurant.js";

// @desc    Create New User
// @route   POST /delivery-app/v1/user
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  if (password.length < 8) {
    return next(new Error("password length cannot be less than 8 characters "));
  }
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });
  const { name, email, id } = newUser;
  if (newUser) {
    res.status(200).json({
      success: true,
      data: {
        name: name,
        email: email,
        id: id,
      },
    });
  } else {
    next(new Error("🚨🚨🚨 Error in 🚨 newUser 🚨 function"));
  }
});

// @desc    User Login
// @route   GET /delivery-app/v1/user
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate({
    path: "orders",
  });
const loggedUser={
  ...user.toJSON(),
  password:"****",
  orders:user.orders
}
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      success: true,
      data: {
        user:loggedUser,
        token: generateToken(),
      }
    });
  } else {
    next(new Error("invalid credentials!"));
  }
});

// @desc    Update existing User
// @route   PUT /delivery-app/v1/user/:id
// @access  Private
export const updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const toUpdate = req.body;
  const updatedUser = await User.findByIdAndUpdate(userId, toUpdate, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    return next(new Error(`User ${userId}, Not Found !`));
  }
  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});

// @desc    Delete User & user ID from relevant Orders
// @route   DELETE /delivery-app/v1/user/:id
// @access  Private
export const deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const userType = (await isRestaurant(userId)) ? "restaurantId" : "driverId";
  console.log(userType);
  if (!userType) {
    next(new Error(`failed detecting userType`));
  }
  const deleteRestaurantId = await Order.updateMany(
    { [userType]: userId },
    { $unset: { [userType]: "removed Account" } },
    { new: true, multi: true }
  );

  if (!deleteRestaurantId) {
    next(new Error(`failed removing user Id ${userId}, from Orders`));
  }

  const deletedUser = await User.findOneAndDelete(
    { _id: userId },
    { new: true }
  );
  if (!deletedUser) {
    return next(new Error(`invalid User ${userId}`));
  }

  res.status(200).json({
    success: true,
    data: deletedUser,
  });
});
