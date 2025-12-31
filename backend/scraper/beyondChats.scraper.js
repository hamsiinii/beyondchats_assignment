// scraper/beyondChats.scraper.js
import axios from "axios";
import * as cheerio from "cheerio";

async function fetchArticleContent(articleUrl) {
  const { data } = await axios.get(articleUrl);
  const $ = cheerio.load(data);

  const content = $(".entry-content").html()?.trim() || ""; // adjust selector if needed
  return content;
}

export async function fetchOldestArticles() {
  const { data } = await axios.get("https://beyondchats.com/blogs/"); // plural
  const $ = cheerio.load(data);

  const articles = []; // <--- declare this
  $(".entries")
    .find("article")
    .each((i, el) => {
      const title = $(el).find("h2.entry-title").text().trim();
      const relativeUrl = $(el).find("h2.entry-title a").attr("href");
      const url = new URL(relativeUrl, "https://beyondchats.com").href;
      const publishedDate = $(el).find("li.meta-date").text().trim();

      articles.push({ title, url, publishedDate });
    });

  // Sort by date ascending (oldest first)
  articles.sort(
    (a, b) => new Date(a.publishedDate) - new Date(b.publishedDate)
  );

  // Take 5 oldest
  const oldest5 = articles.slice(0, 5);

  // Fetch content for each article
  for (const article of oldest5) {
    article.content = await fetchArticleContent(article.url);
  }

  console.log(`Found ${oldest5.length} oldest articles`);
  return oldest5;
}
