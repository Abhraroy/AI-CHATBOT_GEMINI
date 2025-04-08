import { Router } from "express";
import { getAlluser, userlogin, userLogout, usersignup, verifyuser } from "../controllers/userController.js";
import { loginvalidator, signupvalidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token manager.js";
const userRoutes = Router();
userRoutes.get("/", getAlluser);
userRoutes.post("/signup", validate(signupvalidator), usersignup);
userRoutes.post("/login", validate(loginvalidator), userlogin);
userRoutes.get("/auth-status", verifyToken, verifyuser);
userRoutes.get("/logout", verifyToken, userLogout);
export default userRoutes;
//# sourceMappingURL=userRoutes.js.map