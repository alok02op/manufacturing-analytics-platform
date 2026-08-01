import { userRepository } from "@/repositories/user.repository.js";
import { hashPassword, comparePassword } from "@/utils/password.js";
import { generateToken } from "@/utils/jwt.js";
import type { LoginDto, RegisterDto } from "@/types/auth.types.js";
import { ApiError } from "@/utils/apiError.js";

const register = async (data: RegisterDto) => {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
        throw new ApiError(409, "Email already registered");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await userRepository.create({
        ...data,
        password: hashedPassword,
    });

    const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    return { 
        user, 
        accessToken: token
    };
};

const login = async (data: LoginDto) => {
    const user = await userRepository.findByEmail(data.email);

    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    const matched = await comparePassword(data.password, user.password);

    if (!matched) {
        throw new ApiError(401, "Invalid credentials");
    }

    const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
        accessToken: token,
    };
};

const getCurrentUser = async (userId: number) => {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return user;
};

export const authService = {
    register,
    login,
    getCurrentUser,
};