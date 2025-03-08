import { Router } from "express";

const contentRouter = Router();

contentRouter.post("/", (req, res) => {
    res.json({
        message: "content endpoint"
    })
})

export { contentRouter };