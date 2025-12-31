// backend/src/routes/articles.routes.js
import express from "express";
import {
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../services/articles.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const articles = await getAllArticles();
  res.json(articles);
});

router.get("/:id", async (req, res) => {
  const article = await getArticleById(req.params.id);
  res.json(article);
});

router.put("/:id", async (req, res) => {
  const updated = await updateArticle(req.params.id, req.body);
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const deleted = await deleteArticle(req.params.id);
  res.json(deleted);
});

export default router;
