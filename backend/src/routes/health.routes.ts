import { Router } from "express"

const router = Router();

router.get("/", (__, res) => {
    res.status(200).json({
        status: "OK",
        message: "Manufacturing Analytics API",
    })
})

export default router

