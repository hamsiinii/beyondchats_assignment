const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Searches Google for a query and returns top 2 blog/article URLs
 * @param {string} query - Search query (article title)
 * @returns {Promise<string[]>} - Array of URLs
 */
async function searchGoogle(query) {
  try {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    
    const { data } = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(data);
    const urls = [];
    
    // Extract URLs from search results
    $('a').each((i, element) => {
      const href = $(element).attr('href');
      
      if (href && href.startsWith('/url?q=')) {
        const url = href.split('/url?q=')[1].split('&')[0];
        
        // Filter: must be http/https, exclude google/youtube/social media
        if (
          url.startsWith('http') &&
          !url.includes('google.com') &&
          !url.includes('youtube.com') &&
          !url.includes('facebook.com') &&
          !url.includes('twitter.com') &&
          !url.includes('beyondchats.com') // Exclude original source
        ) {
          urls.push(decodeURIComponent(url));
        }
      }
    });
    
    // Remove duplicates and return top 2
    const uniqueUrls = [...new Set(urls)];
    return uniqueUrls.slice(0, 2);
    
  } catch (error) {
    console.error('Google search error:', error.message);
    return [];
  }
}

module.exports = { searchGoogle };
