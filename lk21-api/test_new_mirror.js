const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://tv3.nontondrama.my/';

async function testExtraction() {
    try {
        console.log(`Fetching ${url}...`);
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        
        const $ = cheerio.load(response.data);
        const payload = [];
        
        // Use the new combined selector
        const items = $('article, .sliders li, .grid-item, .post-item');
        console.log(`Found ${items.length} potental items.`);
        
        items.each((i, el) => {
            if (i >= 5) return; // Only show first 5
            
            const $el = $(el);
            let anchor = $el.find('figure > a');
            if (anchor.length === 0) anchor = $el.find('a').first();
            if (anchor.length === 0 && $el.is('a')) anchor = $el;
            
            const href = anchor.attr('href');
            if (!href || href === '#' || href.includes('javascript:')) return;
            
            const slug = href.replace(/^https?:\/\/[^\/]+/, '').replace(/^\//, '').replace(/\/$/, '');
            
            const title = anchor.find('.poster-title, figcaption h3, h2').text().trim() || anchor.find('img').attr('alt') || '';
            const posterImg = anchor.find('img').attr('src') || anchor.find('img').attr('data-src') || '';
            const rating = anchor.find('.rating').text().replace(/[^\d.]/g, '').trim();
            const year = anchor.find('span.year, .meta-label').first().text().trim();
            
            payload.push({
                slug,
                title,
                posterImg,
                rating,
                year,
                quality: anchor.find('span.label, .quality').first().text().trim()
            });
        });
        
        console.log('Sample Extracted Data:');
        console.log(JSON.stringify(payload, null, 2));
        
    } catch (err) {
        console.error('Error:', err.message);
    }
}

testExtraction();
