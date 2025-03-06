const mongoose=require('mongoose');
const { type } = require('os');

const UserSchema=new mongoose.Schema({
    FirstName:{
        required:true,
        type:String,
        trim:true
    },
    LastName:{
        type:String,
        trim:true,
    },
    Email:{
        type:String,
        required:true,
        trim:true
    },
    PhoneNo:{
        type:Number,
        required:true,
    },
    PassWord:{
        required:true,
        type:String
    },
    Token:{
        type:String
    },
    AccountType:{
        type:String,
        enum:["Admin","Customer"]
    }
},{timestamps:true})

const UserModel=mongoose.model("User",UserSchema);

module.exports=UserModel;