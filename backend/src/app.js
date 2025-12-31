import express from "express";
import articlesRoutes from "./routes/articles.routes.js";

const app = express();
app.use(express.json());

app.use("/api/articles", articlesRoutes);

export default app;
