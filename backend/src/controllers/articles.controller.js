import * as articleService from "../services/articles.service.js";

export async function scrapeArticles(req, res) {
  try {
    const articles = await articleService.scrapeAndSaveArticles();
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to scrape articles" });
  }
}

export async function getArticles(req, res) {
  const articles = await articleService.getAllArticles();
  res.json(articles);
}

export async function getArticle(req, res) {
  const article = await articleService.getArticleById(req.params.id);
  res.json(article);
}

export async function updateArticleController(req, res) {
  const updated = await articleService.updateArticle(req.params.id, req.body);
  res.json(updated);
}

export async function deleteArticleController(req, res) {
  await articleService.deleteArticle(req.params.id);
  res.json({ message: "Deleted" });
}
