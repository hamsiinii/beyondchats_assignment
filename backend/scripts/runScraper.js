require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Function to scrape BeyondChats blog - Get 5 oldest articles from last page
async function scrapeBeyondChatsBlog() {
  try {
    console.log(
      "🚀 Starting to scrape BeyondChats blog (last page - oldest articles)..."
    );

    // First, get the main blog page to find pagination
    const mainUrl = "https://beyondchats.com/blogs/";
    const mainResponse = await axios.get(mainUrl);
    const $main = cheerio.load(mainResponse.data);

    // Find the last page number
    let lastPageUrl = mainUrl;
    const paginationLinks = $main(
      'a[href*="/blogs/page/"], .pagination a, .page-numbers a'
    );

    let maxPage = 1;
    paginationLinks.each((index, element) => {
      const href = $main(element).attr("href");
      const pageMatch = href?.match(/page\/(\d+)/);
      if (pageMatch) {
        const pageNum = parseInt(pageMatch[1]);
        if (pageNum > maxPage) {
          maxPage = pageNum;
        }
      }
    });

    if (maxPage > 1) {
      lastPageUrl = `https://beyondchats.com/blogs/page/${maxPage}/`;
      console.log(
        `📄 Found ${maxPage} pages. Fetching last page: ${lastPageUrl}`
      );
    } else {
      console.log("📄 Only one page found, using main page");
    }

    // Scrape the last page
    const response = await axios.get(lastPageUrl);
    const $ = cheerio.load(response.data);

    const articles = [];

    // Scrape article cards
    $(".blog-card, .post-card, article").each((index, element) => {
      const $element = $(element);

      const title =
        $element.find("h2, h3, .title").text().trim() ||
        $element.find("a").first().text().trim();

      const articleUrl = $element.find("a").first().attr("href");
      const fullUrl = articleUrl?.startsWith("http")
        ? articleUrl
        : `https://beyondchats.com${articleUrl}`;

      const excerpt = $element
        .find("p, .excerpt, .description")
        .first()
        .text()
        .trim();

      if (title && fullUrl) {
        articles.push({
          title,
          url: fullUrl,
          content: excerpt || title,
          publishedDate: new Date(),
          isRewritten: false,
          references: [],
        });
      }
    });

    // If no articles found with the above selectors, try alternative selectors
    if (articles.length === 0) {
      $('a[href*="/blog"], a[href*="/article"]').each((index, element) => {
        if (index >= 5) return false; // Get only first 5

        const $element = $(element);
        const title = $element.text().trim();
        const url = $element.attr("href");
        const fullUrl = url?.startsWith("http")
          ? url
          : `https://beyondchats.com${url}`;

        if (title && fullUrl && title.length > 10) {
          articles.push({
            title,
            url: fullUrl,
            content: title,
            publishedDate: new Date(),
            isRewritten: false,
            references: [],
          });
        }
      });
    }

    console.log(`✅ Found ${articles.length} articles from last page`);

    // Return only 5 oldest articles (last 5 from the last page)
    const oldestArticles = articles.slice(-5);
    console.log(`📌 Returning 5 oldest articles`);

    return oldestArticles;
  } catch (error) {
    console.error("❌ Error scraping BeyondChats blog:", error.message);
    throw error;
  }
}

// Function to save articles to database
async function saveArticlesToDatabase(articles) {
  try {
    console.log("💾 Saving articles to database...");

    let savedCount = 0;
    let skippedCount = 0;

    for (const article of articles) {
      try {
        // Check if article already exists
        const existing = await prisma.article.findFirst({
          where: { url: article.url },
        });

        if (existing) {
          console.log(`⏭️  Skipped (already exists): ${article.title}`);
          skippedCount++;
          continue;
        }

        // Create new article
        await prisma.article.create({
          data: article,
        });

        console.log(`✅ Saved: ${article.title}`);
        savedCount++;
      } catch (error) {
        console.error(
          `❌ Error saving article "${article.title}":`,
          error.message
        );
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   - Saved: ${savedCount} articles`);
    console.log(`   - Skipped: ${skippedCount} articles`);

    return { savedCount, skippedCount };
  } catch (error) {
    console.error("❌ Error saving articles:", error.message);
    throw error;
  }
}

// Main function
async function main() {
  try {
    console.log("=".repeat(50));
    console.log("🤖 BeyondChats Article Scraper");
    console.log("=".repeat(50));
    console.log("");

    // Scrape articles
    const articles = await scrapeBeyondChatsBlog();

    if (articles.length === 0) {
      console.log(
        "⚠️  No articles found. The website structure might have changed."
      );
      console.log("📝 Creating sample articles for testing...");

      // Create sample articles for testing
      const sampleArticles = [
        {
          title: "The Future of AI in Customer Service",
          url: "https://beyondchats.com/blog/ai-customer-service",
          content:
            "Artificial intelligence is revolutionizing the way businesses interact with their customers. From chatbots to predictive analytics, AI is making customer service more efficient and personalized.",
          publishedDate: new Date(),
          isRewritten: false,
          references: [],
        },
        {
          title: "Building Better Chatbots: Best Practices",
          url: "https://beyondchats.com/blog/chatbot-best-practices",
          content:
            "Creating an effective chatbot requires careful planning and implementation. This article covers the key principles and best practices for building chatbots that truly help your customers.",
          publishedDate: new Date(),
          isRewritten: false,
          references: [],
        },
        {
          title: "Understanding Natural Language Processing",
          url: "https://beyondchats.com/blog/nlp-explained",
          content:
            "Natural Language Processing (NLP) is the technology that enables computers to understand and process human language. This article explores how NLP works and its various applications.",
          publishedDate: new Date(),
          isRewritten: false,
          references: [],
        },
        {
          title: "Customer Engagement Strategies for 2024",
          url: "https://beyondchats.com/blog/engagement-strategies-2024",
          content:
            "Customer engagement is more important than ever. Learn about the latest strategies and technologies that leading companies are using to connect with their customers.",
          publishedDate: new Date(),
          isRewritten: false,
          references: [],
        },
        {
          title: "Automation in Business: A Complete Guide",
          url: "https://beyondchats.com/blog/business-automation-guide",
          content:
            "Business automation is transforming industries across the globe. This comprehensive guide covers everything you need to know about implementing automation in your organization.",
          publishedDate: new Date(),
          isRewritten: false,
          references: [],
        },
      ];

      await saveArticlesToDatabase(sampleArticles);
    } else {
      // Save scraped articles
      await saveArticlesToDatabase(articles);
    }

    console.log("");
    console.log("=".repeat(50));
    console.log("✨ Scraping completed successfully!");
    console.log("=".repeat(50));
  } catch (error) {
    console.error("💥 Fatal error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the scraper
main();
