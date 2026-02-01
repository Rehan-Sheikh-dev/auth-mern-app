import express from "express"
import {signupMiddleWare,loginMiddleWare,logoutMiddleWare} from "../middlewares/auth.middleware.js";
import {createdUser,loggedInUser,logoutUser} from "../controllers/user.controller.js";

const app = express.Router();

app.post("/signup", signupMiddleWare ,createdUser);
app.post("/login",loginMiddleWare,loggedInUser)
app.post("/logout",logoutMiddleWare,logoutUser);

export default app 