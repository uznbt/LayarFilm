const https = require('https');
const cheerio = require('cheerio');

const url = 'https://tv3.lk21online.mom/mortuary-assistant-2026';

https.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
}, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        const $ = cheerio.load(rawData);
        console.log('--- BASIC INFO ---');
        console.log('H1:', $('h1').text().trim());
        console.log('Year span:', $('span.year').text());
        console.log('Blockquote:', $('blockquote').text().trim());
        console.log('Desc class:', $('.desc').text().trim());
        console.log('Entry content:', $('.entry-content').text().trim().substring(0, 500));
        
        console.log('--- ALL SPANS ---');
        $('span').each((i, el) => {
            const cls = $(el).attr('class');
            if (cls) console.log(`Span class=${cls}: ${$(el).text()}`);
        });
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
