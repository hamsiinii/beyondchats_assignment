import express from "express";
import articlesRouter from "./src/routes/articles.routes.js"; // default export

const app = express();
app.use(express.json());

app.use("/articles", articlesRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
