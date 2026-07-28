import healthRoutes from './health.routes.js'
import { Router } from 'express'

const router = Router()

router.use("/", healthRoutes)

export default router

