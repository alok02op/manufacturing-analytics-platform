import { z } from "zod";

export const createFactorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Factory name must be at least 3 characters")
        .max(100),

    location: z
        .string()
        .trim()
        .min(3, "Location must be at least 3 characters")
        .max(255),
});

export const updateFactorySchema =
    createFactorySchema.partial();

export type CreateFactoryFormData =
    z.infer<typeof createFactorySchema>;

export type UpdateFactoryFormData =
    z.infer<typeof updateFactorySchema>;