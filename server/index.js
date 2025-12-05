import express from "express";
import articleRoutes from "./routes/articleRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/articles", articleRoutes);

app.listen(process.env.PORT, () => {
  console.log("Backend running");
});
