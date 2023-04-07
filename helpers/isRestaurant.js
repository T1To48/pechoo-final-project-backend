import User from "../models/userModel.js"


export const isRestaurant=async(userId)=>{
    const {userType}=await User.findById(userId);
    if(userType!=="Restaurant"){
      return true;
    }
    return false;
}