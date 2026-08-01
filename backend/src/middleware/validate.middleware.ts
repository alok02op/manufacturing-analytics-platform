import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";
import { ApiError } from "@/utils/apiError.js";

type ValidationSchema = {
    body?: ZodObject;
    params?: ZodObject;
    query?: ZodObject;
};

export const validate =
    (schema: ValidationSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schema.body) {
                req.body = schema.body.parse(req.body);
            }

            if (schema.params) {
                req.params = schema.params.parse(req.params) as any;
            }

            if (schema.query) {
                req.query = schema.query.parse(req.query) as any;
            }

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return next(
                    new ApiError(
                        400,
                        "Validation failed",
                        error.issues.map((issue) => ({
                            field: issue.path.join("."),
                            message: issue.message,
                        }))
                    )
                );
            }

            next(error);
        }
    };