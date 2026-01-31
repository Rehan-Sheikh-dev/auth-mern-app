import express from 'express';
import dotenv from "dotenv";
import DbConnect from './config/mongoose-connect.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import userRouter from "./routes/user.routes.js"

dotenv.config();

  (async()=>{
    try {
        await DbConnect();
        console.log("MongoDb Connected.!!")
    } catch (error) {
        console.log("MongoDb connection error:",error)
        process.exit(1)
    }
  })();

const app = express();

app.use(express.json({}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors())
app.use("/user",userRouter)

app.get("/",function(req,res){
    res.send("hello")
})

app.listen(process.env.PORT,function(){
    console.log(`Server is running on port ${process.env.PORT}`)
})
