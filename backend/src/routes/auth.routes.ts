import { Router } from "express";
import { authController } from "@/controllers/auth.controller.js";
import { validate } from "@/middleware/validate.middleware.js";
import {
    loginSchema,
    registerSchema,
} from "@/validators/index.js";
import { authenticate } from "@/middleware/auth.middleware.js";

const router = Router();

router.post(
    "/register",
    validate({
        body: registerSchema,
    }),
    authController.register
);

router.post(
    "/login",
    validate({
        body: loginSchema,
    }),
    authController.login
);

router.get(
    "/me",
    authenticate,
    authController.me
);

router.post(
    "/logout",
    authenticate,
    authController.logout
);

export default router;