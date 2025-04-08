import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const chatschema = new Schema({
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});
const user = new Schema({
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
export const usermodel = mongoose.model("user", user);
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
