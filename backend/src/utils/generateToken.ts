import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response } from 'express'

dotenv.config();

export const generateToken = (userId: Number, res: Response) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
    })
    
    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV !== "development",
    });

    return token;
}