import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},   
    cartData:{type:Object,default:{}},
},{minmize:false});

const userModel = mongoose.model.user || mongoose.model('userModel',userSchema);

export default userModel;