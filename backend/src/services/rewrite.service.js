// src/services/rewrite.service.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Uses OpenAI API to rewrite article based on reference articles
 * @param {Object} originalArticle - { title, content }
 * @param {Array} referenceArticles - Array of { url, title, content }
 * @returns {Promise<string>} - Rewritten HTML content
 */
export async function rewriteArticle(originalArticle, referenceArticles) {
  const prompt = `
You are an expert SEO content writer.

ORIGINAL ARTICLE:
Title: ${originalArticle.title}
Content:
${originalArticle.content}

REFERENCE ARTICLES (Top Google Results):
${referenceArticles
  .map(
    (ref, i) => `
Reference ${i + 1}:
Title: ${ref.title}
URL: ${ref.url}
Content:
${ref.content.substring(0, 2000)}
`
  )
  .join("\n")}

TASK:
Rewrite the original article by:
- Matching the formatting style of the reference articles
- Improving clarity, depth, and structure
- Keeping the original meaning intact
- Making it SEO-friendly
- Writing in professional, engaging language

IMPORTANT:
Return ONLY the rewritten article content in valid HTML.
Do NOT add explanations or preamble.
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini", // fast + affordable
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const rewrittenContent = response.choices[0].message.content;

    const referencesHtml = `
      <hr/>
      <h3>References</h3>
      <ul>
        ${referenceArticles
          .map(
            (ref) =>
              `<li><a href="${ref.url}" target="_blank">${ref.title}</a></li>`
          )
          .join("\n")}
      </ul>
    `;

    return rewrittenContent + referencesHtml;
  } catch (error) {
    console.error("OpenAI API error:", error.message);
    throw new Error("Failed to rewrite article with AI");
  }
}
