import mongoose from "mongoose";

const driverSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"please enter your name"],
        maxLength:[20,"name cannot exceed 20 characters "]
    },
    email:{
        type: String,
        required: true,
        unique: [true, "Email already exist ,please choose another one"],
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please add a valid email",
        ],
    },
    password:{
        type:String,
        minLength:[8,"password length cannot be less than 8 characters"]
    },
    phone:{
        type:Number,
        unique:[true,"Phone Number already exist ,please choose another one"],
        required:[true,"please provide a phone number"]

    },
    address:{
        
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
  })
  
const driverModel = mongoose.model("driverModel", driverSchema);

export default driverModel;