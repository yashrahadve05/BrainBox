import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'

import { contentRouter } from './routes/content';
import { userRouter } from './routes/user';
import { shareRouter } from './routes/share';

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain", shareRouter);

app.listen(3000, () => {
    console.log("Server is listening");
});