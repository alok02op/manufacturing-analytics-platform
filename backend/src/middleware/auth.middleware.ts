import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/jwt.js";
import { UserRole } from "@/generated/prisma/enums.js";
import { COOKIE_NAME } from "@/config/cookie.config.js";
import { ApiError } from "@/utils/apiError.js";

export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: UserRole;
    };
}

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies[COOKIE_NAME];

    if (!token) {
        return next(new ApiError(401, "Unauthorized"));
    }

    try {
        req.user = verifyToken(token);
        next();
    } catch {
        return next(new ApiError(401, "Invalid or expired token"));
    }
};

export const authorize = (...roles: UserRole[]) =>
    (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        if (!req.user) {
            return next(new ApiError(401, "Unauthorized"));
        }

        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, "Forbidden"));
        }
        
        next();
    };