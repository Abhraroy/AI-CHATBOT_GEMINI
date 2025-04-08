"use strict";
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
exports.userLogout = exports.verifyuser = exports.userlogin = exports.usersignup = exports.getAlluser = void 0;
var usermodel_js_1 = require("../models/usermodel.js");
var bcrypt_1 = require("bcrypt");
var token_manager_js_1 = require("../utils/token manager.js");
var constants_js_1 = require("../utils/constants.js");
var getAlluser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, usermodel_js_1.usermodel.find()];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Ok", user: user })];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(404).json({ message: "Error", cause: err_1.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAlluser = getAlluser;
var usersignup = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, password, existinguser, hashedPass, user, token, expires, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password;
                return [4 /*yield*/, usermodel_js_1.usermodel.findOne({ email: email })];
            case 1:
                existinguser = _b.sent();
                if (existinguser) {
                    return [2 /*return*/, res.status(401).json({ msg: "User already exists" })];
                }
                return [4 /*yield*/, (0, bcrypt_1.hash)(password, 10)];
            case 2:
                hashedPass = _b.sent();
                return [4 /*yield*/, usermodel_js_1.usermodel.create({
                        name: name_1,
                        email: email,
                        password: hashedPass,
                    })];
            case 3:
                user = _b.sent();
                res.clearCookie(constants_js_1.COOKIE_NAME, {
                    httpOnly: true,
                    domain: "localhost",
                    signed: true,
                    path: "/",
                });
                token = (0, token_manager_js_1.tokenmanager)(user._id.toString(), user.email);
                expires = new Date();
                expires.setDate(expires.getDate() + 7);
                res.cookie(constants_js_1.COOKIE_NAME, token, {
                    path: "/",
                    domain: "localhost",
                    expires: expires,
                    httpOnly: true,
                    signed: true,
                });
                return [2 /*return*/, res.status(201).json({ message: "Ok", name: user.name, email: user.email })];
            case 4:
                err_2 = _b.sent();
                console.log(err_2);
                return [2 /*return*/, res.status(404).json({ message: "Error", cause: err_2.message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.usersignup = usersignup;
var userlogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, existinguser, existingpassword, ispassword, token, expires, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, usermodel_js_1.usermodel.findOne({ email: email })];
            case 1:
                existinguser = _b.sent();
                existingpassword = existinguser.password;
                if (!existinguser) {
                    return [2 /*return*/, res.status(401).json({ msg: "User doesnot exists" })];
                }
                return [4 /*yield*/, (0, bcrypt_1.compare)(password, existingpassword)];
            case 2:
                ispassword = _b.sent();
                if (!ispassword) {
                    return [2 /*return*/, res.status(403).json({ msg: "incorect password" })];
                }
                res.clearCookie(constants_js_1.COOKIE_NAME, {
                    httpOnly: true,
                    domain: "localhost",
                    signed: true,
                    path: "/",
                });
                token = (0, token_manager_js_1.tokenmanager)(existinguser._id.toString(), existinguser.email);
                expires = new Date();
                expires.setDate(expires.getDate() + 7);
                res.cookie(constants_js_1.COOKIE_NAME, token, {
                    path: "/",
                    domain: "localhost",
                    expires: expires,
                    httpOnly: true,
                    signed: true,
                });
                return [2 /*return*/, res.status(200).json({ message: "Ok", name: existinguser.name, email: existinguser.email })];
            case 3:
                err_3 = _b.sent();
                console.log(err_3);
                return [2 /*return*/, res.status(404).json({ message: "Error", cause: err_3.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.userlogin = userlogin;
var verifyuser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var existinguser, existingpassword, err_4;
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
                return [2 /*return*/, res.status(200).json({ message: "Ok", name: existinguser.name, email: existinguser.email })];
            case 2:
                err_4 = _a.sent();
                console.log(err_4);
                return [2 /*return*/, res.status(404).json({ message: "Error", cause: err_4.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.verifyuser = verifyuser;
var userLogout = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var existinguser, existingpassword, err_5;
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
                res.clearCookie(constants_js_1.COOKIE_NAME, {
                    httpOnly: true,
                    domain: "localhost",
                    signed: true,
                    path: "/",
                });
                return [2 /*return*/, res.status(200).json({ message: "Logged out successfully" })];
            case 2:
                err_5 = _a.sent();
                console.log(err_5);
                return [2 /*return*/, res.status(404).json({ message: "Error", cause: err_5.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.userLogout = userLogout;
