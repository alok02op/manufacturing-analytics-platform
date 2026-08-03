import { z } from "zod";

export const productionLineStatus = [
    "ACTIVE",
    "INACTIVE",
    "MAINTENANCE",
] as const;

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

    status: z.enum(productionLineStatus),

    factoryId: z
        .number({
            error: "Please select a factory",
        })
        .positive(),
});

export type CreateProductionLineFormData =
    z.infer<typeof createProductionLineSchema>;