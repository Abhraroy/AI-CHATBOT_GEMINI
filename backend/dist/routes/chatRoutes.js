import { Router } from "express";
import { verifyToken } from "../utils/token manager.js";
import { chatvalidator, validate } from "../utils/validator.js";
import { deletechatofuser, generatechat, sendChattouser } from "../controllers/chatcontroller.js";
const chatUser = Router();
chatUser.post("/new", validate(chatvalidator), verifyToken, generatechat);
chatUser.get("/history", verifyToken, sendChattouser);
chatUser.delete("/delete", verifyToken, deletechatofuser);
export default chatUser;
//# sourceMappingURL=chatRoutes.js.map