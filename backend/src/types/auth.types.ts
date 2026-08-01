import { UserRole } from "@/generated/prisma/enums.js";

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
}

export interface LoginDto {
    email: string;
    password: string;
}

export type JwtPayload = {
    id: number;
    email: string;
    role: UserRole;
};