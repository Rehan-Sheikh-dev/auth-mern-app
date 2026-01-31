import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:15
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:4,
    }
})

const user = mongoose.model("user",userSchema);

export default user;