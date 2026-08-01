export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export const UserRole = {
    ADMIN: "ADMIN",
    ENGINEER: "ENGINEER",
    MANAGER: "MANAGER",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}