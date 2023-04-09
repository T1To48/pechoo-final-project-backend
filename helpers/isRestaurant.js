import User from "../models/userModel.js"


export const isRestaurant=async(userId)=>{
  try{
    const {userType}=await User.findById(userId);
    if(userType!=="Restaurant"){
      return false;
    }
    return true;
  }
    catch(error){
console.log(error);
    }
}