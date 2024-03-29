import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please enter your name"],
      maxLength: [20, "name cannot exceed 20 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exist ,please choose another one"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "password length cannot be less than 8 characters"],
    },
    phone: {
      type: Number,
      unique: [true, "Phone Number already exist ,please choose another one"],
      required: [true, "please provide a phone number"],
      maxLength: [9, "password length cannot be less than 8 characters"],
    },
    address: String,
    coords: String,
    userType: {
      type: String,
      require: [true, "Please choose a role: Restaurant or Driver"],
      enum: ["Restaurant", "Driver"],
    },
    isActive: Boolean,
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderModel",
      },
    ],
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

const userModel = mongoose.model("userModel", UserSchema);

export default userModel;
