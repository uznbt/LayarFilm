const https = require('https');
const cheerio = require('cheerio');

const url = 'https://tv3.lk21online.mom/mortuary-assistant-2026';

https.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
}, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        const $ = cheerio.load(rawData);
        $('script[type="application/ld+json"]').each((i, el) => {
            console.log('--- SCRIPT ' + i + ' ---');
            try {
                const data = JSON.parse($(el).html() || '{}');
                console.log('Type:', data['@type']);
                if (data['@type'] === 'Movie' || data['@type'] === 'TVSeries') {
                    console.log('Name:', data.name);
                    console.log('Description:', data.description ? 'FOUND (length: ' + data.description.length + ')' : 'NOT FOUND');
                    console.log('Image:', data.image);
                    console.log('Genre:', data.genre);
                    console.log('Actor:', data.actor ? 'FOUND' : 'NOT FOUND');
                }
            } catch (e) {
                console.log('Parse error in script ' + i);
            }
        });
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
