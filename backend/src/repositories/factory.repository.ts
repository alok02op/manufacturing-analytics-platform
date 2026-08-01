import prisma from "@/prisma/client.js";
import type {
    CreateFactoryDto,
    UpdateFactoryDto,
} from "@/types/factory.types.js";

const create = async (data: CreateFactoryDto) => {
    return prisma.factory.create({
        data,
    });
};

const findById = async (id: number) => {
    return prisma.factory.findUnique({
        where: { id },
    });
};

const findByName = async (name: string) => {
    return prisma.factory.findUnique({ 
        where: { name } 
    });
};

const findAll = async () => {
    return prisma.factory.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

const update = async (
    id: number,
    data: UpdateFactoryDto
) => {
    return prisma.factory.update({
        where: { id },
        data,
    });
};

const remove = async (id: number) => {
    return prisma.factory.delete({
        where: { id },
    });
};

const countProductionLines = async (factoryId: number) => {
    return prisma.productionLine.count({
        where: {
            factoryId,
        },
    });
};

export const factoryRepository = {
    create,
    findById,
    findByName,
    findAll,
    update,
    remove,
    countProductionLines,
};