import { ProductionLineStatus } from "@/generated/prisma/enums.js";

export interface CreateProductionLineDto {
    name: string;
    code: string;
    description?: string;
    status?: ProductionLineStatus;
    factoryId: number;
}

export interface UpdateProductionLineDto {
    name?: string;
    code?: string;
    description?: string;
    status?: ProductionLineStatus;
    factoryId?: number;
}