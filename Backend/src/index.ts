import express from "express";
import cors from 'cors';

// Ensure the paths to the router modules are correct
import { contentRouter } from './routes/content';
import { userRouter } from './routes/user';
import { shareRouter } from './routes/share';

const app = express();
app.use(express.json()); // Corrected line to parse JSON
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain", shareRouter);

app.listen(3000, () => {
    console.log("Server is listening");
});