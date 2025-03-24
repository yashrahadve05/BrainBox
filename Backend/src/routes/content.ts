import { Router } from "express";
import { userMiddleware } from "../middleware/user";

const contentRouter = Router();

contentRouter.post("/", userMiddleware, async (req, res) => {
    res.json({
        message: "content endpoint"
    })
})

contentRouter.get("/", userMiddleware, async (req, res) => {
    res.json({
        message: "content endpoint"
    })
})

contentRouter.delete("/", userMiddleware, async (req, res) => {
    res.json({
        message: "content endpoint"
    })
})

export { contentRouter };