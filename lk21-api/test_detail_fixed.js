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
        const obj = {};
        
        // Scope to main container
        const detailContainer = $('.content-poster').length ? $('.content-poster').parent() : $('h1').parent().parent();
        
        obj.title = $('h1').text().trim() || $('h1[itemprop="name"]').text().trim();
        obj.posterImg = $('img[itemprop="image"]').attr('src') || $('figure img').attr('src');
        obj.rating = $('.rating').first().text().trim() || $('[itemprop="ratingValue"]').first().text().trim();
        obj.duration = $('span.duration, [itemprop="duration"]').first().text().trim();
        
        obj.synopsis = $('[itemprop="description"]').text().trim() || $('.description, .synopsis, blockquote').first().text().trim() || $('p').eq(1).text().trim();
        
        obj.trailerUrl = $('iframe').attr('src') || $('a.fancybox').attr('href') || '';
        
        obj.directors = [];
        $('[itemprop="director"]').each((i, el) => obj.directors.push($(el).text().trim()));
        if (obj.directors.length === 0) {
            $('p:contains("Sutradara:")').find('a').each((i, el) => obj.directors.push($(el).text().trim()));
        }
        
        obj.casts = [];
        $('[itemprop="actor"]').each((i, el) => obj.casts.push($(el).text().trim()));
        if (obj.casts.length === 0) {
            $('p:contains("Bintang:")').find('a').each((i, el) => obj.casts.push($(el).text().trim()));
        }
        
        obj.genres = [];
        $('[itemprop="genre"]').each((i, el) => obj.genres.push($(el).text().trim()));
        
        obj.countries = [];
        $('p:contains("Negara:")').find('a').each((i, el) => obj.countries.push($(el).text().trim()));

        obj.releaseDate = $('span.year').first().text().trim();
        obj.quality = $('span.quality, span.label').first().text().trim() || 'HD';
        
        fs.writeFileSync('detail_fixed.json', JSON.stringify(obj, null, 2), 'utf-8');
        console.log("Done");
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
