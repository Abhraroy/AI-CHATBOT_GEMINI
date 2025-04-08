import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { COOKIE_NAME } from "./constants.js";

export const tokenmanager = (id: string, email: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const token = req.signedCookies[`${COOKIE_NAME}`]
    if(!token){
        return res.status(401).json({msg:"Toek not generated"})
    }
    console.log(token);
    return new Promise<void>((resolve,reject)=>{
        return jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{
            if(err){
                reject(err)
                return res.status(401).json({msg:"Toek expired"})
            }else{
                console.log("token verification successful");
                resolve();
                res.locals.jwtData = success;
                return next()
            }
        })
    })
};
