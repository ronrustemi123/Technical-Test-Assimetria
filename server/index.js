import express from "express";
import articleRoutes from "./routes/articleRoutes.js";
import dotenv from "dotenv";
import { scheduleArticleGenerator } from "./services/scheduler.js";
dotenv.config();

const app = express();


app.use(express.json());
app.use("/articles", articleRoutes);

scheduleArticleGenerator();


app.listen(process.env.PORT, () => {
  console.log("Backend running");
});
