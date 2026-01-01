import express from "express";
import cors from "cors";
import articlesRouter from "./src/routes/articles.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/articles", articlesRouter); // <--- this enables GET /articles

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
