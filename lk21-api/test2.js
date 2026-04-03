const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('../home.html', 'utf8');
const $ = cheerio.load(html);

const items = [];
$('article').each((i, el) => {
    const parent = $(el).find('figure > a');
    const title = parent.find('.poster-title').text() || parent.find('img').attr('alt');
    const href = parent.attr('href');
    const slug = href ? href.replace(/^\//, '') : '';
    
    // Type classification
    let isSeries = false;
    if (parent.find('span.episode').length > 0) isSeries = true;
    
    const posterImg = parent.find('img').attr('src') || parent.find('img').attr('data-src');
    const duration = parent.find('span.duration').text().trim();
    const rating = parent.find('.rating').text().replace(/[^\d.]/g, '').trim();
    
    items.push({
        _id: slug,
        title,
        type: isSeries ? 'series' : 'movie',
        posterImg,
        rating,
        url: href
    });
});

console.log(JSON.stringify(items.slice(0, 3), null, 2));
