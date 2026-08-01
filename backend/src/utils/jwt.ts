import jwt from "jsonwebtoken";
import { JwtPayload } from "@/types/auth.types.js";

export const generateToken = (payload: JwtPayload) => {
    return jwt.sign(
        payload, 
        process.env.JWT_SECRET!, 
        { expiresIn: "7d" }
    );
};

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
};
