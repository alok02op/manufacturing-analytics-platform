import prisma from "@/prisma/client.js";
import type {
    CreateProductionLineDto,
    UpdateProductionLineDto,
} from "@/types/productionLine.types.js";

const create = async (data: CreateProductionLineDto) => {
    return prisma.productionLine.create({
        data,
        include: {
            factory: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
};

const findById = async (id: number) => {
    return prisma.productionLine.findUnique({
        where: { id },
        include: {
            factory: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
};

const findByFactoryAndCode = async (
    factoryId: number,
    code: string
) => {
    return prisma.productionLine.findUnique({
        where: {
            factoryId_code: {
                factoryId,
                code,
            },
        },
    });
};

const findAll = async (
    factoryId?: number
) => {
    return prisma.productionLine.findMany({
        where: {
            ...(factoryId && { factoryId }),
        },

        include: {
            factory: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });
};

const update = async (
    id: number,
    data: UpdateProductionLineDto
) => {
    return prisma.productionLine.update({
        where: { id },
        data,
        include: {
            factory: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
};

const remove = async (id: number) => {
    return prisma.productionLine.delete({
        where: {
            id,
        },
    });
};

const countMachines = async (productionLineId: number) => {
    return prisma.machine.count({
        where: {
            productionLineId,
        },
    });
};

export const productionLineRepository = {
    create,
    findById,
    findByFactoryAndCode,
    findAll,
    update,
    remove,
    countMachines,
};