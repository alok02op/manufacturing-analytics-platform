import { Router } from "express";
import { factoryController } from "@/controllers/factory.controller.js";
import { authenticate, authorize } from "@/middleware/auth.middleware.js";
import { validate } from "@/middleware/validate.middleware.js";
import {
    createFactorySchema,
    updateFactorySchema,
    factoryIdSchema,
} from "@/validators/factory.validator.js";
import { UserRole } from "@/generated/prisma/enums.js";

const router = Router();

router.use(authenticate);

router.post(
    "/",
    authorize(UserRole.ADMIN),
    validate({
        body: createFactorySchema,
    }),
    factoryController.create
);

router.get(
    "/",
    authorize(
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.ENGINEER
    ),
    factoryController.getAll
);

router.get(
    "/:id",
    authorize(
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.ENGINEER
    ),
    validate({
        params: factoryIdSchema,
    }),
    factoryController.getById
);

router.patch(
    "/:id",
    authorize(UserRole.ADMIN),
    validate({
        params: factoryIdSchema,
        body: updateFactorySchema,
    }),
    factoryController.update
);

router.delete(
    "/:id",
    authorize(UserRole.ADMIN),
    validate({
        params: factoryIdSchema,
    }),
    factoryController.remove
);

export default router;