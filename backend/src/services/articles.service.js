import prisma from "../db/prismaClient.js";
import { fetchOldestArticles } from "../../scraper/beyondChats.scraper.js";

export async function scrapeAndSaveArticles() {
  const articles = await fetchOldestArticles();

  const savedArticles = [];

  for (const article of articles) {
    const existing = await prisma.article.findUnique({
      where: { url: article.url },
    });

    if (!existing) {
      const saved = await prisma.article.create({
        data: {
          title: article.title,
          content: article.content, // already fetched
          url: article.url,
          publishedDate: new Date(article.publishedDate),
          references: [],
        },
      });
      savedArticles.push(saved);
    }
  }

  return savedArticles;
}

export async function getAllArticles() {
  return prisma.article.findMany({ orderBy: { publishedDate: "asc" } });
}

export async function getArticleById(id) {
  return prisma.article.findUnique({ where: { id } });
}

export async function updateArticle(id, data) {
  return prisma.article.update({ where: { id }, data });
}

export async function deleteArticle(id) {
  return prisma.article.delete({ where: { id } });
}
