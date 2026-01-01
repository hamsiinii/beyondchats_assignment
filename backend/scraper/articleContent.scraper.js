// scraper/articleContent.scraper.js
import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeMultipleArticles(urls) {
  const articles = [];

  for (const url of urls) {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const title = $("h1").first().text().trim() || $("title").text().trim();

      const content = $("article").html() || $(".entry-content").html() || "";

      if (content) {
        articles.push({ title, url, content });
      }
    } catch (err) {
      console.warn(`⚠️ Failed to scrape ${url}`);
    }
  }

  return articles;
}
