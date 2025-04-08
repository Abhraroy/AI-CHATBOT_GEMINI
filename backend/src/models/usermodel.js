"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usermodel = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var ObjectId = Schema.ObjectId;
var chatschema = new Schema({
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});
var user = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    chatofuser: [chatschema]
});
exports.usermodel = mongoose_1.default.model("user", user);
// import mongoose from "mongoose";
// import { randomUUID } from "crypto";
// const chatSchema = new mongoose.Schema({
//   id: {
//     type: String,
//     default: randomUUID(),
//   },
//   role: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
// });
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   chats: [chatSchema],
// });
// export default mongoose.model("usermodel", userSchema);
// export const usermodel = mongoose.model("user",userSchema)
