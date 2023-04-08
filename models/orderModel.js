import mongoose from "mongoose";


const orderStatusEnum = [
  "Published",
  "Accepted",
  "Ready For Delivery",
  "On The Way",
  "Delivered",
];

const orderSchema = new mongoose.Schema({
  restaurantId:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "userModel",
  },
  driverId:{
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
  },
  customerAddress: {
    addressName: {
      type: String,
    },
    cords: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
  },
  price: {
    type: Number,
    required: [true, "please provide the Order Price"],
  },
  orderStatus: {
    type: String,
    default:"Published",
    enum: orderStatusEnum,
  },
  readyTime:{
    type:Number,
    required:[true,"please provide how much time, does the order need to be ready for delivery"]
  },
  createdAt:{
    type:Date,
    default:new Date(),
  },
  isActive:{
    type:Boolean,
    default:true,
  }
},{
    versionKey:false,
    toJSON:{
      transform:function(doc,ret){
        ret.id=ret._id;
        delete ret._id;
        delete ret.__v;
      }
    },
    toObject:{
      transform: function(doc,ret){
        ret.id=ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  });

 

  const orderModel=mongoose.model("orderModel",orderSchema);

  export default orderModel;
