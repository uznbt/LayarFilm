const https = require('https');
const cheerio = require('cheerio');

https.get('https://tv3.lk21online.mom/humint-2026', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
}, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        const $ = cheerio.load(rawData);
        console.log('Title (h1):', $('h1').text().trim());
        console.log('Poster:', $('img').first().attr('src') || $('img').eq(1).attr('src'));
        console.log('Rating:', $('.rating, [itemprop="ratingValue"]').text().trim());
        console.log('Duration:', $('span.duration, [itemprop="duration"]').text().trim());
        console.log('Synopsis blockquote:', $('blockquote').text().trim());
        console.log('Trailer:', $('iframe').attr('src'));
        
        console.log('--- METADATA ---');
        // The mirror often places metadata natively like <p><strong>Director:</strong> ...</p>
        $('p').each((i, el) => {
             const str = $(el).text();
             if (str.includes(':')) {
                 console.log(str.trim().substring(0, 100).replace(/\n/g, ' '));
             }
        });
        
        console.log('--- LINKS ---');
        $('a[rel="tag"]').each((i, el) => {
            console.log('Tag:', $(el).text());
        });
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
