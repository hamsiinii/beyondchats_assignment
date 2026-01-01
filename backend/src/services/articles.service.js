const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all articles
exports.getAllArticles = async (filters = {}, options = {}) => {
  try {
    const { limit = 100, offset = 0 } = options;

    const articles = await prisma.article.findMany({
      where: filters,
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: "desc",
      },
    });

    return articles;
  } catch (error) {
    console.error("Error in getAllArticles service:", error);
    throw error;
  }
};

// Get article by ID
exports.getArticleById = async (id) => {
  try {
    const article = await prisma.article.findUnique({
      where: { id },
    });

    return article;
  } catch (error) {
    console.error("Error in getArticleById service:", error);
    throw error;
  }
};

// Create new article
exports.createArticle = async (articleData) => {
  try {
    const article = await prisma.article.create({
      data: articleData,
    });

    return article;
  } catch (error) {
    console.error("Error in createArticle service:", error);
    throw error;
  }
};

// Update article
exports.updateArticle = async (id, articleData) => {
  try {
    const article = await prisma.article.update({
      where: { id },
      data: articleData,
    });

    return article;
  } catch (error) {
    console.error("Error in updateArticle service:", error);
    throw error;
  }
};

// Delete article
exports.deleteArticle = async (id) => {
  try {
    await prisma.article.delete({
      where: { id },
    });

    return true;
  } catch (error) {
    console.error("Error in deleteArticle service:", error);
    throw error;
  }
};

// Search articles
exports.searchArticles = async (query) => {
  try {
    const articles = await prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
          { excerpt: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return articles;
  } catch (error) {
    console.error("Error in searchArticles service:", error);
    throw error;
  }
};
