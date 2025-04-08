"use strict";
// import { NextFunction, Request, Response } from "express";
// import { usermodel } from "../models/usermodel.js";
// import { configureopenai } from "../config/openai.config.js";
// import {OpenAIApi,ChatCompletionRequestMessage} from "openai"
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from 'dotenv';
// dotenv.config();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletechatofuser = exports.sendChattouser = exports.generatechat = void 0;
var usermodel_js_1 = require("../models/usermodel.js");
var generative_ai_1 = require("@google/generative-ai");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
// ✅ Check if API key exists
if (!process.env.GEMINI_API_KEY) {
    throw new Error("❌ GEMINI_API_KEY is not defined in .env");
}
var genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
var model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
var generatechat = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var message, user, chats, chat, result, replyText, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log("User ID from JWT:", (_a = res.locals.jwtData) === null || _a === void 0 ? void 0 : _a.id);
                message = req.body.message;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                return [4 /*yield*/, usermodel_js_1.usermodel.findById(res.locals.jwtData.id)];
            case 2:
                user = _c.sent();
                if (!user)
                    return [2 /*return*/, res.status(401).json({ message: "user not registered" })];
                chats = user.chatofuser.map(function (_a) {
                    var role = _a.role, content = _a.content;
                    return ({
                        role: role === "assistant" ? "model" : "user",
                        parts: [{ text: content }],
                    });
                });
                // Add user's new message
                chats.push({ role: "user", parts: [{ text: message }] });
                user.chatofuser.push({ content: message, role: "user" });
                chat = model.startChat({ history: chats });
                return [4 /*yield*/, chat.sendMessage(message)];
            case 3:
                result = _c.sent();
                replyText = result.response.text();
                // Log the AI reply
                console.log("🤖 Gemini reply:", replyText);
                // Save AI reply to DB
                user.chatofuser.push({ content: replyText, role: "assistant" });
                return [4 /*yield*/, user.save()];
            case 4:
                _c.sent();
                return [2 /*return*/, res.status(200).json({ chats: user.chatofuser })];
            case 5:
                error_1 = _c.sent();
                console.error("🔥 Gemini Chat Error:", ((_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _b === void 0 ? void 0 : _b.data) || error_1.message || error_1);
                return [2 /*return*/, res.status(500).json({
                        message: "Something went wrong",
                        error: (error_1 === null || error_1 === void 0 ? void 0 : error_1.message) || "Unknown error",
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.generatechat = generatechat;
var sendChattouser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var existinguser, existingpassword, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, usermodel_js_1.usermodel.findById(res.locals.jwtData.id)];
            case 1:
                existinguser = _a.sent();
                existingpassword = existinguser.password;
                if (!existinguser) {
                    return [2 /*return*/, res.status(401).json({ msg: "User doesnot exists" })];
                }
                if (existinguser._id.toString() !== res.locals.jwtData.id) {
                    return [2 /*return*/, res.status(401).json({ msg: "permission didnt match" })];
                }
                return [2 /*return*/, res.status(200).json({ message: "Ok", chats: existinguser.chatofuser })];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(404).json({ message: "Error", cause: err_1.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendChattouser = sendChattouser;
var deletechatofuser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var existinguser, existingpassword, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, usermodel_js_1.usermodel.findById(res.locals.jwtData.id)];
            case 1:
                existinguser = _a.sent();
                existingpassword = existinguser.password;
                if (!existinguser) {
                    return [2 /*return*/, res.status(401).json({ msg: "User doesnot exists" })];
                }
                if (existinguser._id.toString() !== res.locals.jwtData.id) {
                    return [2 /*return*/, res.status(401).json({ msg: "permission didnt match" })];
                }
                //@ts-ignore
                existinguser.chatofuser = [];
                return [4 /*yield*/, existinguser.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json([])];
            case 3:
                err_2 = _a.sent();
                console.log(err_2);
                return [2 /*return*/, res.status(404).json({ message: "Error", cause: err_2.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletechatofuser = deletechatofuser;
