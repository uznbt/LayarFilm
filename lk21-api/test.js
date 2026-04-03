const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('../home.html', 'utf8');
const $ = cheerio.load(html);
console.log($('article').first().html());
