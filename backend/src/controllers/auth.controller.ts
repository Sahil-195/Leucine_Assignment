import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../config/dataSource";
import { User } from "../entities/User.entity";
import { generateToken } from "../utils/generateToken";

const userRepository = AppDataSource.getRepository(User);

type SignupRequest = {
    username: string;
    email: string;
    password: string;
    role: 'Employee' | 'Manager' | 'Admin';
}

type LoginRequest = {
    username: string;
    password: string;
}

export const signup = async (req: Request<{}, {}, SignupRequest>, res: Response) => {

    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password || !role) {
            res.status(400).json({ message: "All fields are required." });
            return ;
        }
        
        if (password.length < 6) {
            res.status(400).json({ message: "Password must be at least 6 characters" });
            return ;
        }
        
        const existingUser = await userRepository.findOne({
            where: [
                { username },
                { email }
            ]
        });
        
        
        
        if (existingUser) {
            res.status(400).json({
                message: existingUser.username === username
                ? "Username already exists"
                : "Email already exists"
            });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = userRepository.create({
            username,
            email,
            password: hashedPassword,
            role
        });
        
        
        await userRepository.save(newUser);
        const token = generateToken(newUser.id, res);
        
        res.status(201).json({
            token: token,
            user: {
                username: newUser.username,
                roleName: newUser.role
            }
        });
    } catch (error) {
        console.error("Error in signup controller:", error instanceof Error ? error.message : "Unknown error");
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req: Request<{}, {}, LoginRequest>, res: Response) => {
    const { username, password } = req.body;
    
    try {
        const user = await userRepository.findOne({ where: { username } });
        
        if (!user) {
            res.status(400).json({ message: "Invalid Credentials" });
            return ;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid Credentials" });
            return ;
        }

        const token = generateToken(user.id, res);


        res.status(201).json({
            token: token,
            user: {
                username: user.username,
                roleName: user.role
            }
        });
    } catch (error) {
        console.error("Error in login controller:", error instanceof Error ? error.message : "Unknown error");
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = (_req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller:", error instanceof Error ? error.message : "Unknown error");
        res.status(500).json({ message: "Internal Server Error" });
    }
};


