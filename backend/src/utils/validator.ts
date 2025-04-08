import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";



export  const validate = (validations:ValidationChain[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        for(let validation of validations){
            const result = await validation.run(req)
            if(!result.isEmpty()){
                break;
            }
        }
        const err = validationResult(req);
        if(err.isEmpty()){
            return next();
        }
        res.status(422).json({err:err})
    }
}




export const loginvalidator = [
    body("email").trim().isEmail().notEmpty().withMessage("Email is required"),
    body("password").trim().isLength({min:6}).notEmpty().withMessage("password is required")
]



export const signupvalidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginvalidator,
]


export const chatvalidator = [
    body("message").notEmpty().withMessage("message is required"),
    // ...loginvalidator,
]