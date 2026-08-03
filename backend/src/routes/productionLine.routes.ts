import { Router } from "express";
import { UserRole } from "@/generated/prisma/enums.js";
import { productionLineController } from "@/controllers/productionLine.controller.js";
import {
    authenticate,
    authorize,
} from "@/middleware/auth.middleware.js";
import { validate } from "@/middleware/validate.middleware.js";
import {
    createProductionLineSchema,
    updateProductionLineSchema,
    productionLineIdSchema,
} from "@/validators/productionLine.validator.js";

const router = Router();

router.use(authenticate);

router.post(
    "/",
    authorize(UserRole.ADMIN),
    validate({
        body: createProductionLineSchema,
    }),
    productionLineController.create
);

router.get(
    "/",
    authorize(
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.ENGINEER
    ),
    productionLineController.getAll
);

router.get(
    "/:id",
    authorize(
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.ENGINEER
    ),
    validate({
        params: productionLineIdSchema,
    }),
    productionLineController.getById
);

router.patch(
    "/:id",
    authorize(UserRole.ADMIN),
    validate({
        params: productionLineIdSchema,
        body: updateProductionLineSchema,
    }),
    productionLineController.update
);

router.delete(
    "/:id",
    authorize(UserRole.ADMIN),
    validate({
        params: productionLineIdSchema,
    }),
    productionLineController.remove
);

export default router;