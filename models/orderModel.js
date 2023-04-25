import mongoose from "mongoose";

const orderStatusEnum = [
  "Published",
  "Accepted",
  "Ready For Delivery",
  "On The Way",
  "Delivered",
];

const orderSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
    customerName: {
      type: String,
      trim: true,
      required: [true, "please enter your name"],
      maxLength: [20, "name cannot exceed 20 characters "],
    },
    customerPhone: {
      type: Number,
      required: [true, "please provide a phone number"],
      maxLength: [9, "password length cannot be less than 8 characters"],
    },
    customerAddress: {
      type: String,
      required: [true, "please provide an address"],
    },
    coords: {
      type: String,
      required: [true, "please provide Coordinates"],
    },
    price: {
      type: Number,
      required: [true, "please provide the Order Price"],
    },
    orderStatus: {
      type: String,
      default: "Published",
      enum: orderStatusEnum,
    },
    readyTime:Number,
    createdAtMS:String,
    createdAt:{
      type:Date,
      default: new Date(),
    }
  },
  {
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const orderModel = mongoose.model("orderModel", orderSchema);

export default orderModel;
