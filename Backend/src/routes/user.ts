import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", (req, res) => {
    res.json({
        message: "signup endpoint"
    })
})

userRouter.post("/login", (req, res) => {
    res.json({
        message: "login endpoint"
    })
})

export { userRouter };

