import healthRoutes from './health.routes.js'
import authRoutes from './auth.routes.js'
import { Router } from 'express'
import factoryRoutes from "./factory.routes.js";

const router = Router()

router.use("/health", healthRoutes)
router.use("/auth", authRoutes)
router.use("/factories", factoryRoutes);

export default router

