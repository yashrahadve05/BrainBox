import { Router } from "express";
import { userMiddleware } from "../middleware/user";

const contentRouter = Router();

contentRouter.post("/", userMiddleware, async (req, res) => {
    res.json({
        message: "Content creation endpoint"
    })
})

export { contentRouter };