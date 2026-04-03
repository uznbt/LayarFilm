const https = require('https');
const cheerio = require('cheerio');

https.get('https://tv3.lk21online.mom/?s=avatar', {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
}, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        const $ = cheerio.load(rawData);
        const results = [];
        $('article').each((i, el) => {
            if (i > 3) return; // Only process first few
            const parent = $(el).find('figure > a');
            if (parent.length === 0) return;
            const title = parent.find('.poster-title').text() || parent.find('img').attr('alt');
            const href = parent.attr('href');
            results.push({ title, href });
        });
        console.log("Results from search: ", results);
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
