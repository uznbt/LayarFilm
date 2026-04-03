const https = require('https');
const cheerio = require('cheerio');

const url = 'https://tv3.lk21online.mom/humint-2026';

https.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
}, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        const $ = cheerio.load(rawData);
        console.log('--- BASIC INFO ---');
        console.log('H1:', $('h1').text().trim());
        console.log('Poster:', $('img[itemprop="image"]').attr('src') || $('figure img').attr('src'));
        console.log('Rating:', $('.rating').first().text().trim() || $('[itemprop="ratingValue"]').first().text().trim());
        console.log('Year:', $('span.year').first().text().trim());
        console.log('Duration:', $('span.duration').first().text().trim());
        
        console.log('--- SYNOPSIS ---');
        console.log('Itemprop desc:', $('[itemprop="description"]').text().trim().substring(0, 200));
        console.log('Blockquote:', $('blockquote').text().trim().substring(0, 200));
        console.log('Entry Content:', $('.entry-content p').text().trim().substring(0, 200));
        
        console.log('--- METADATA ---');
        $('p').each((i, el) => {
            const text = $(el).text();
            if (text.includes(':')) {
                console.log('P:', text.trim());
            }
        });
        
        console.log('--- TAGS ---');
        $('a[rel="tag"]').each((i, el) => {
            const href = $(el).attr('href');
            console.log('Tag:', $(el).text(), 'HREF:', href);
        });
        
        console.log('--- TRAILER ---');
        console.log('Iframe:', $('iframe').attr('src'));
        console.log('Fancybox hook:', $('a.fancybox').attr('href'));
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
