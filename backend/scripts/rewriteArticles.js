// scripts/rewriteArticles.js
import prisma from "../src/db/prismaClient.js";
import { searchGoogle } from "../scraper/googleSearch.scraper.js";
import { scrapeMultipleArticles } from "../scraper/articleContent.scraper.js";
import { rewriteArticle } from "../src/services/rewrite.service.js";

async function rewriteAllArticles() {
  try {
    // Get all original (non-rewritten) articles
    const articles = await prisma.article.findMany({
      where: { isRewritten: false }
    });

    console.log(`Found ${articles.length} articles to rewrite\n`);

    for (const article of articles) {
      console.log(`📝 Processing: ${article.title}`);

      // Step 1: Google search
      console.log("🔍 Searching Google...");
      const googleUrls = await searchGoogle(article.title);
      console.log(`Found ${googleUrls.length} URLs`);

      if (googleUrls.length === 0) {
        console.log("⚠️  No results found, skipping...\n");
        continue;
      }

      // Step 2: Scrape reference articles
      console.log("📄 Scraping reference articles...");
      const referenceArticles = await scrapeMultipleArticles(googleUrls);

      if (referenceArticles.length === 0) {
        console.log("⚠️  Could not scrape content, skipping...\n");
        continue;
      }

      console.log(`Scraped ${referenceArticles.length} articles`);

      // Step 3: Rewrite with OpenAI
      console.log("🤖 Rewriting with OpenAI...");
      const rewrittenContent = await rewriteArticle(
        { title: article.title, content: article.content },
        referenceArticles
      );

      // Step 4: Save rewritten article
      console.log("💾 Saving rewritten article...");
      await prisma.article.create({
        data: {
          title: `${article.title} (Updated)`,
          content: rewrittenContent,
          url: `${article.url}-updated`,
          publishedDate: new Date(),
          isRewritten: true,
          originalId: article.id,
          references: referenceArticles.map(r => r.url),
        },
      });

      console.log("✅ Done\n");

      // Rate limit (important for OpenAI + Google scraping)
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log("🎉 All articles rewritten successfully!");
  } catch (error) {
    console.error("Rewrite pipeline failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

rewriteAllArticles();
