import express from "express"
import {signupMiddleWare,loginMiddleWare} from "../middlewares/auth.middleware.js";
import {createdUser,loggedInUser} from "../controllers/user.controller.js";

const app = express.Router();

app.post("/signup", signupMiddleWare ,createdUser);
app.post("/login",loginMiddleWare,loggedInUser)

export default app