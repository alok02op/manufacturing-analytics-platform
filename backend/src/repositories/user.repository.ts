import prisma from "@/prisma/client.js";
import type { RegisterDto } from "@/types/auth.types.js";

const findByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email },
    });
};

const create = async (data: RegisterDto) => {
    return prisma.user.create({
        data,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

const findById = async (id: number) => {
    return prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const userRepository = {
    findByEmail,
    findById,
    create,
};