const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Scrapes main content from an article URL
 * @param {string} url - Article URL
 * @returns {Promise<{url: string, title: string, content: string}>}
 */
async function scrapeArticleContent(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(data);
    
    // Remove unwanted elements
    $('script, style, nav, header, footer, aside, iframe, img').remove();
    
    // Try common content selectors
    let content = 
      $('article').text() ||
      $('.post-content').text() ||
      $('.entry-content').text() ||
      $('.article-content').text() ||
      $('main').text() ||
      $('body').text();
    
    // Clean up content
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim()
      .substring(0, 5000); // Limit to 5000 chars
    
    const title = $('h1').first().text().trim() || $('title').text().trim();
    
    return {
      url,
      title,
      content: content || 'Could not extract content'
    };
    
  } catch (error) {
    console.error(`Failed to scrape ${url}:`, error.message);
    return {
      url,
      title: 'Error',
      content: 'Failed to fetch content'
    };
  }
}

/**
 * Scrapes multiple articles
 * @param {string[]} urls - Array of URLs
 * @returns {Promise<Array>}
 */
async function scrapeMultipleArticles(urls) {
  const results = await Promise.all(
    urls.map(url => scrapeArticleContent(url))
  );
  return results.filter(r => r.content !== 'Failed to fetch content');
}

module.exports = { scrapeArticleContent, scrapeMultipleArticles };
