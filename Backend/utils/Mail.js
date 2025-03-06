const nodemailer=require("nodemailer");
require('dotenv').config();

exports.mail=async(isEmail,tittle,body)=>{
     try{
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        let info=await transporter.sendMail({
            from:"MoneyMate",
            to:`${isEmail}`,
            subject:`${tittle}`,
            html:body
        })
        return info;
     }catch(err){
        console.log(err);
        return err.message;
     }
}