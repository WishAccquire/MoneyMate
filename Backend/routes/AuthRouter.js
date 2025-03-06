const {Login,SignUp,Sendotp}=require("../controller/Auth")

const express=require('express')
const router=express.Router()

router.post("/Login",Login);
router.post("/Signup",SignUp);

router.post("/sendotp", Sendotp)

module.exports=router;