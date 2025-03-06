require('dotenv').config();
const moongoose=require('mongoose')

const connectDb=async()=>{
    try{
        const connectDb=await moongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        console.log("MangoDb is connected");
    }catch(err){
         console.log("mangodb failed to connected");
         console.log(err.message);
         process.exit(1);
    }
}

module.exports=connectDb;