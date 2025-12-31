import { scrapeAndSaveArticles } from "../src/services/articles.service.js";

scrapeAndSaveArticles().then((articles) => {
  console.log("Saved articles:", articles);
  process.exit(0);
});
