import { signUp, login, getUserData, deleteUser } from "../controllers/user.js";
import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.js";

const userRoute = Router();

userRoute.post("/signup", signUp);
userRoute.post("/login", login);
userRoute.get("/me", authenticateToken, getUserData);
userRoute.delete("/delete", authenticateToken, deleteUser);

export default userRoute;
