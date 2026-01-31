import express from 'express';
import dotenv from "dotenv";
import DbConnect from './config/mongoose-connect.js';
import cookieParser from 'cookie-parser';
import userRouter from "./routes/user.routes.js"
import { fileURLToPath } from "url";
import path from "path";

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


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser());
app.set("view engine","ejs");
app.use("/user",userRouter)

app.get("/",function(req,res){
    res.render("index",{error:""})
})

app.listen(process.env.PORT,function(){
    console.log(`Server is running on port ${process.env.PORT}`)
})
