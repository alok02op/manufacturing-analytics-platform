import { z } from "zod";
import { ProductionLineStatus } from "@/generated/prisma/enums.js";

export const createProductionLineSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Production line name must be at least 3 characters")
        .max(100),

    code: z
        .string()
        .trim()
        .min(2, "Code must be at least 2 characters")
        .max(30),

    description: z
        .string()
        .trim()
        .max(255)
        .optional(),

    status: z
        .enum(ProductionLineStatus)
        .optional(),

    factoryId: z.coerce.number().int().positive(),
});

export const updateProductionLineSchema =
    createProductionLineSchema.partial();

export const productionLineIdSchema = z.object({
    id: z.coerce.number().int().positive(),
});