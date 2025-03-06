const express=require('express')
const Connectdb=require('./configuration/MangoData')
const cors=require('cors')
const UserRoute=require('./routes/AuthRouter.js')
require('dotenv').config();

const app=express();
Connectdb();
app.use(express.json());
app.use('/api/v1/user',UserRoute)

app.get('/',(req,res)=>{
    return res.send("Hello World");
})

app.listen(process.env.PORT|| 4000,()=>{
    console.log("we are ready");
})