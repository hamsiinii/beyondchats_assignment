const articlesService = require("../services/articles.service");

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const { isRewritten, limit, offset } = req.query;

    const filters = {};
    if (isRewritten !== undefined) {
      filters.isRewritten = isRewritten === "true";
    }

    const articles = await articlesService.getAllArticles(filters, {
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    });

    res.json({ articles });
  } catch (error) {
    console.error("Error in getAllArticles:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get article by ID
exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await articlesService.getArticleById(id);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json({ article });
  } catch (error) {
    console.error("Error in getArticleById:", error);
    res.status(500).json({ error: error.message });
  }
};

// Create new article
exports.createArticle = async (req, res) => {
  try {
    const articleData = req.body;
    const article = await articlesService.createArticle(articleData);
    res.status(201).json({ article });
  } catch (error) {
    console.error("Error in createArticle:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update article
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const articleData = req.body;
    const article = await articlesService.updateArticle(id, articleData);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json({ article });
  } catch (error) {
    console.error("Error in updateArticle:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete article
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    await articlesService.deleteArticle(id);
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error in deleteArticle:", error);
    res.status(500).json({ error: error.message });
  }
};
