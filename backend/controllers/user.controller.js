import userModel from "../models/user.models.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const createdUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        });
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
        );
        res.cookie("token", token);
        res.redirect("/?success=User%20created%20successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
}


export const loggedInUser = async (req, res) => {   
   const { email, password } = req.body;
   const user = await userModel.findOne({ email });

   if (!user) return res.render("error");

   bcrypt.compare(password, user.password, function(err, result) {
       if (err) return res.status(500).send({ error: "Something went wrong!" });
       if (!result) return res.status(401).send({ error: "Password Incorrect!" });

       const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY);
       res.cookie("token", token);
       res.render("login",{user});
   });
}


export const logoutUser = async (req,res) => {
    res.cookie("token","");
     res.redirect("/?logout=success");
}
