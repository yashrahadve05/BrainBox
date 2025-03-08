import { Router } from 'express';

const shareRouter = Router();

shareRouter.post("/share", (req, res) => {
    res.json({
        message: "share endpoint"
    })
})

export { shareRouter };