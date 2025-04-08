import { NextFunction, Request, Response } from "express";
import { usermodel } from "../models/usermodel.js";
import { hash, compare } from "bcrypt";
import { tokenmanager } from "../utils/token manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAlluser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get all user
  try {
    const user = await usermodel.find();
    return res.status(200).json({ message: "Ok", user: user });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Error", cause: err.message });
  }
};

export const usersignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const existinguser = await usermodel.findOne({ email: email });
    if (existinguser) {
      return res.status(401).json({ msg: "User already exists" });
    }

    const hashedPass = await hash(password, 10);
    const user = await usermodel.create({
      name: name,
      email: email,
      password: hashedPass,
    });


    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
      });
  
      const token = tokenmanager(user._id.toString(), user.email);
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      res.cookie(COOKIE_NAME, token, {
        path: "/",
        domain: "localhost",
        expires,
        httpOnly: true,
        signed: true,
      });




    return res.status(201).json({ message: "Ok",name:user.name,email:user.email });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Error", cause: err.message });
  }
};













export const userlogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const existinguser = await usermodel.findOne({ email: email });
    const existingpassword = existinguser.password;
    if (!existinguser) {
      return res.status(401).json({ msg: "User doesnot exists" });
    }

    const ispassword = await compare(password, existingpassword);
    if (!ispassword) {
      return res.status(403).json({ msg: "incorect password" });
    }
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = tokenmanager(existinguser._id.toString(), existinguser.email);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
    return res.status(200).json({ message: "Ok",name:existinguser.name,email:existinguser.email });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Error", cause: err.message });
  }
};



export const verifyuser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existinguser = await usermodel.findById(res.locals.jwtData.id);
    const existingpassword = existinguser.password;
    if (!existinguser) {
      return res.status(401).json({ msg: "User doesnot exists" });
    }

    if(existinguser._id.toString()!==res.locals.jwtData.id){
      return res.status(401).json({ msg: "permission didnt match" });
    }

    return res.status(200).json({ message: "Ok",name:existinguser.name,email:existinguser.email });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Error", cause: err.message });
  }
};


export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existinguser = await usermodel.findById(res.locals.jwtData.id);
    const existingpassword = existinguser.password;
    if (!existinguser) {
      return res.status(401).json({ msg: "User doesnot exists" });
    }

    if(existinguser._id.toString()!==res.locals.jwtData.id){
      return res.status(401).json({ msg: "permission didnt match" });
    }
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Error", cause: err.message });
  }
};

