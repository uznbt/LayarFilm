require('module-alias/register'); 
const axios = require('./dist/utils/axios').default; 
const cheerio = require('cheerio'); 
axios.get('https://tv3.lk21online.mom/?s=avatar').then(res => { 
    const $ = cheerio.load(res.data); 
    const payload = []; 
    $('article').each((i,el) => { 
        const parent = $(el).find('figure > a'); 
        if(parent.length === 0) return; 
        payload.push(parent.attr('href')); 
    }); 
    console.log("Found:", payload.length, payload.slice(0, 3)); 
}).catch(console.error);
