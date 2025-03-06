const User=require("../model/User");
const validator = require('validator');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const otpGenerator=require("otp-generator")
const OTP=require('../model/Otp')

exports.Sendotp=async(req,res)=>{
    try{
        const {Email}=req.body;
        const valid = validator.isEmail(Email);
        
        if (!valid) {
            return res.status(401).json({
                success: false,
                message: "Please Enter Correct Email"
            })
        }
        const checkEmail = await User.findOne({ Email });
        if (checkEmail) {
            return res.status(401).json({
                success: false,
                message: "The Email is Already Register"
            })
        }

        var generateotp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,

        })
        console.log("otp generate:", generateotp);
        const result = await OTP.findOne({ otp: generateotp });
        while (result) {
            generateotp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })
            result = await OTP.findOne({ Otp: generateotp });
        }

        const payload = { Email: Email, Otp: generateotp };

        const otp = await OTP.create(payload);
        

        res.status(201).json({
            success: true,
            message: 'OTP Send Successfully',
            data: otp,
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: err.message,
            data: "Failed to send otp"
        })
    }
}
exports.SignUp=async (req,res)=>{
    try{
        const {FirstName,LastName,Email,PhoneNo,PassWord,ConfirmPassword,CountryCode,AccountType,otp}= req.body;

        if(!FirstName|| !Email || !PhoneNo || !PassWord || !ConfirmPassword || !CountryCode){
            return res.status(401).json({
                success:false,
                message:"Fail to Fetch Details in Signup Page"
            })
        }

        const valid=validator.isEmail(Email);
        
        const validphone=validator.isMobilePhone(String(PhoneNo),CountryCode)
        if(!valid || !validphone){
            return res.status(401).json({
                success:false,
                message:"Please Enater correct Email Address",
            })
        }
       
        if(PassWord!=ConfirmPassword){
            return res.status(401).json({
                success:false,
                message:"Confirm Password is Not Matched to Password"
            })
        }

        const exist=await User.findOne({Email});
        
        if(exist){
            return res.status(401).json({
                success:false,
                message:"User Already Exist"
            })
        }

        const recentOtp=await OTP.find({Email}).sort({CreatedAt:-1}).limit(1);
        console.log("recent otp",recentOtp);
        if(recentOtp.lenght==0|| !recentOtp[0]){
            return res.status(401).json({
                success: false,
                message: "OTP Not Found"
            })
        }

        else if(otp.toString()!==recentOtp[0].Otp.toString()){
            return res.status(401).json({
                success: false,
                message: "Invalid OTP. ENter Valid OTP"
            })
        }

        const hashPassword=await bcrypt.hash(String(PassWord),10);
        console.log("Hello");
        const user=new User({
            FirstName,
            LastName,
            Email,
            PassWord:hashPassword,
            PhoneNo,
            AccountType
        })

        await user.save();
        return res.status(200).json({
            success: true,
            data: "Register Successfully ",
            user,
        })

    }catch(err){
        return res.status(501).json({
            success:false,
            message:"Failed in Signup",
            text:err.message
        })

    }
}

exports.Login=async (req,res)=>{
    try{
        const {Email,PassWord}=req.body;
       
        if( !PassWord || !Email){
            return res.status(401).json({
                success: false,
                message: "Fill All Details"
            })
        }
        const valid = validator.isEmail(Email);
        if (!valid) {
            return res.status(401).json({
                success: false,
                message: "Please Enter Correct Email"
            })
        }

        const checkEmail = await User.findOne({ Email });
        if (!checkEmail) {
            return res.status(401).json({
                success: false,
                message: "The User is not Register"
            })
        }

        if(await bcrypt.compare(String(PassWord),checkEmail.PassWord)){
            const payload={
                email:checkEmail.Email,
                id:checkEmail._id,
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            checkEmail.Token=token;
            await checkEmail.save();
            checkEmail.PassWord=undefined

            const option={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httOnly:true
            }
            res.cookie("token",token,option).json({
                success:true,
                token:token,
                checkEmail,
                message:"Login Successfully"
            })
        }
        else{
            return res.status(401).json({
                success: false,
                data:err.message,
                message: "Password is Incorrect",
                
            })
        }



    }catch(err){
        return res.status(501).json({
            success:false,
            message:"Failed in Login",
            text:err.message
        }) 
    }
}