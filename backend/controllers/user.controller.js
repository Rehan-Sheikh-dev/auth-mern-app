import userModel from "../models/user.models.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const createdUser = async (req, res) => {
    const { name, email, password } = req.body
    bcrypt.genSalt(12, function (err, salt) {
        if(err) return res.status(500).send({message:"Error generating salt"})
        bcrypt.hash(password, salt, async function (err, hash) {
            const user = await userModel.create({
                name,
                email,
                password:hash,
            })
            const token = jwt.sign({email:user.email,id:user._id},process.env.SECRET_KEY);
            res.cookie("token",token);
            res.status(201).send({ message: "user created successfully!!"})
        });
    });
}

export const loggedInUser = async (req, res) => {
   const {email,password} = req.body;
   const user = await userModel.findOne({email})

   if(!user) return res.status(401).send({message:"User does not exist!"})
   
    bcrypt.compare(password,user.password,function(err,result){
        if(!result) return res.status(401).send({message:"Password Incorrect!"})
            const token = jwt.sign({email:user.email,id:user._id},process.env.SECRET_KEY)
        res.cookie("token",token);
      res.status(201).send({message:"user logged in successfully!",userId:user._id})
    })
}
