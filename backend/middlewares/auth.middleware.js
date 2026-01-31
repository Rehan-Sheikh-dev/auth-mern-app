import userModel from "../models/user.models.js"

export const signupMiddleWare = async (req,res,next) => {
     try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) return res.status(400).send( "All fields are required!");
    if (typeof email !== "string"|| typeof name !== "string"||  typeof password !== "string") { 
    return res.status(400).send({error:"Invalid data types",message:"email, name and password must be strings"})
    }
    const user = await userModel.findOne({email});
    if(user) return res.status(409).send("User already exist!");

    if(password.length < 6) return res.status(400).send({message:"Password must be at least 6 characters"});

    next();
  } catch (error) {
     return res.status(500).send({message:"Server Error."})
  }
}

export const loginMiddleWare = async (req,res,next) => {
  try {
    const {email,password} = req.body;
    if(!email || !password) return res.status(400).send({message:"All fields are required"});
    next();
  } catch (error) {
    res.status(500).send({message:"Server Error"})
  }
}

export const logoutMiddleWare = async (req,res,next) => {
  const token = req.cookies.token; 
  if(!token) return res.redirect("/?message=logout");
    next()
}