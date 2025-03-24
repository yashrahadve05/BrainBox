import { Router } from "express";
import { userMiddleware } from "../middleware/user";

const contentRouter = Router();

contentRouter.post("/", userMiddleware, async (req, res) => {
    res.json({
        message: "Content creation endpoint"
    })
})

contentRouter.get("/", userMiddleware, async (req, res) => {
    res.json({
        message: "Get Content endpoint"
    })
})

contentRouter.delete("/", userMiddleware, async (req, res) => {
    res.json({
        message: "Delete content endpoint"
    })
})

export { contentRouter };