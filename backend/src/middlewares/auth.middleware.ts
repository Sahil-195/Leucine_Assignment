import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/dataSource";
import { User } from "../entities/User.entity";

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const token = req.cookies.token;

        if(!token) {
            res.status(401).json({message: "Unauthorized - No Token Provided"});
            return ;
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
        
        if(!decoded) {
            res.status(401).json({message: "Unauthorized - Invalid Token"});
            return ;
        }

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ 
            where: { id: decoded.userId },
        });
        
        if(!user) {
            res.status(404).json({message: "User not found"});
            return ;
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware", error instanceof Error ? error.message : "Unknown error");
        res.status(500).json({message: "Internal Server Error"});
    }
}