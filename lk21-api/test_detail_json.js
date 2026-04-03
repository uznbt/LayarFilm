const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs');

https.get('https://tv3.lk21online.mom/humint-2026', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
}, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        const $ = cheerio.load(rawData);
        const mainHtml = $('main').html() || $('body').html();
        fs.writeFileSync('detail_html_dump.html', mainHtml, 'utf-8');
        console.log("HTML dumped to detail_html_dump.html");
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
