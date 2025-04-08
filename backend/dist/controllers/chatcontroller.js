// import { NextFunction, Request, Response } from "express";
// import { usermodel } from "../models/usermodel.js";
// import { configureopenai } from "../config/openai.config.js";
// import {OpenAIApi,ChatCompletionRequestMessage} from "openai"
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from 'dotenv';
// dotenv.config();
import { usermodel } from "../models/usermodel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
// ✅ Check if API key exists
if (!process.env.GEMINI_API_KEY) {
    throw new Error("❌ GEMINI_API_KEY is not defined in .env");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
export const generatechat = async (req, res, next) => {
    console.log("User ID from JWT:", res.locals.jwtData?.id);
    const { message } = req.body;
    try {
        const user = await usermodel.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "user not registered" });
        // Convert previous messages to Gemini format
        const chats = user.chatofuser.map(({ role, content }) => ({
            role: role === "assistant" ? "model" : "user",
            parts: [{ text: content }],
        }));
        // Add user's new message
        chats.push({ role: "user", parts: [{ text: message }] });
        user.chatofuser.push({ content: message, role: "user" });
        // Gemini chat logic
        const chat = model.startChat({ history: chats });
        const result = await chat.sendMessage(message);
        const replyText = result.response.text();
        // Log the AI reply
        console.log("🤖 Gemini reply:", replyText);
        // Save AI reply to DB
        user.chatofuser.push({ content: replyText, role: "assistant" });
        await user.save();
        return res.status(200).json({ chats: user.chatofuser });
    }
    catch (error) {
        console.error("🔥 Gemini Chat Error:", error?.response?.data || error.message || error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error?.message || "Unknown error",
        });
    }
};
export const sendChattouser = async (req, res, next) => {
    try {
        const existinguser = await usermodel.findById(res.locals.jwtData.id);
        const existingpassword = existinguser.password;
        if (!existinguser) {
            return res.status(401).json({ msg: "User doesnot exists" });
        }
        if (existinguser._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ msg: "permission didnt match" });
        }
        return res.status(200).json({ message: "Ok", chats: existinguser.chatofuser });
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ message: "Error", cause: err.message });
    }
};
export const deletechatofuser = async (req, res, next) => {
    try {
        const existinguser = await usermodel.findById(res.locals.jwtData.id);
        const existingpassword = existinguser.password;
        if (!existinguser) {
            return res.status(401).json({ msg: "User doesnot exists" });
        }
        if (existinguser._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ msg: "permission didnt match" });
        }
        //@ts-ignore
        existinguser.chatofuser = [];
        await existinguser.save();
        return res.json([]);
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ message: "Error", cause: err.message });
    }
};
//# sourceMappingURL=chatcontroller.js.map