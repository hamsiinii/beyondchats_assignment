import axios from "axios";

export async function searchGoogle(query) {
  try {
    const response = await axios.get("https://serpapi.com/search", {
      params: {
        q: query,
        api_key: process.env.SERPAPI_KEY,
        engine: "google",
        num: 5,
      },
    });

    const results = response.data.organic_results || [];

    // Filter only blog/article-like URLs
    const urls = results
      .map((r) => r.link)
      .filter(
        (link) =>
          link &&
          !link.includes("youtube.com") &&
          !link.includes("linkedin.com") &&
          !link.includes("facebook.com")
      )
      .slice(0, 2); // 🔥 ONLY 2 ARTICLES REQUIRED

    return urls;
  } catch (error) {
    console.error("SerpAPI error:", error.message);
    return [];
  }
}
