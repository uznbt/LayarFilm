import * as cheerio from 'cheerio';
import { AxiosResponse } from 'axios';
import { Request } from 'express';
import { ISeasonsList, ISeries, ISeriesDetails, IStreamSources } from '../types';

/**
 * Scrape series asynchronously
 * @param {Request} ExpressRequest
 * @param {AxiosResponse} AxiosResponse
 * @returns {Promise.<ISeries>} array of series objects
 */
export const scrapeSeries = async (
    req: Request,
    res: AxiosResponse
): Promise<ISeries[]> => {
    const $: cheerio.Root = cheerio.load(res.data);
    const payload: ISeries[] = [];
    const {
        headers: { host },
        protocol,
    } = req;

    const items = $('article, .sliders li, .grid-item, .post-item');
    
    items.each((i, el) => {
        const $el = $(el);
        let anchor = $el.find('figure > a');
        if (anchor.length === 0) anchor = $el.find('a').first();
        if (anchor.length === 0 && $el.is('a')) anchor = $el;
        
        const href = anchor.attr('href');
        if (!href || href === '#' || href.includes('javascript:')) return;
        
        const slug = href.replace(/^https?:\/\/[^\/]+/, '').replace(/^\//, '').replace(/\/$/, '');

        // Only add items that have an episode badge or season label (series)
        const hasEpisode = anchor.find('span.episode, .meta-label:contains("Episode")').length > 0;
        const hasSeason = anchor.find('span.duration, .meta-label').text().trim().includes('S.');
        if (!hasEpisode && !hasSeason) return;

        const title = anchor.find('.poster-title, figcaption h3, h2').text().trim() || anchor.find('img').attr('alt') || '';
        const posterImg = anchor.find('img').attr('src') || anchor.find('img').attr('data-src') || '';
        const rating = anchor.find('.rating').text().replace(/[^\d.]/g, '').trim();
        const episodeText = anchor.find('span.episode strong, .meta-label:contains("Episode")').text().replace(/[^\d]/g, '').trim();
        const year = anchor.find('span.year, .meta-label').first().text().trim();

        const obj = {} as ISeries;

        obj['_id'] = slug || '';
        obj['title'] = title || '';
        obj['type'] = 'series';
        obj['posterImg'] = posterImg && !posterImg.startsWith('http') ? `https:${posterImg}` : (posterImg || '');
        obj['rating'] = rating || '';
        obj['year'] = year || '';
        obj['episode'] = episodeText ? Number(episodeText) : 0;
        obj['url'] = `${protocol}://${host}/series/${slug}`;
        obj['genres'] = [];

        // Avoid duplicates
        if (payload.find(s => s._id === obj._id)) return;

        payload.push(obj);
    });


    return payload;
};

/**
 * Scrape series details asynchronously
 * @param {Request} ExpressRequest
 * @param {AxiosResponse} AxiosResponse
 * @returns {Promise.<ISeriesDetails>} series details object
 */
export const scrapeSeriesDetails = async (
    req: Request,
    res: AxiosResponse
): Promise<ISeriesDetails> => {
    const { originalUrl } = req;
    const $: cheerio.Root = cheerio.load(res.data);
    const obj = {} as ISeriesDetails;

    // JSON-LD Extraction
    let ldData: any = {};
    $('script[type="application/ld+json"]').each((i, el) => {
        try {
            const data = JSON.parse($(el).html() || '{}');
            if (data['@type'] === 'Movie' || data['@type'] === 'TVSeries') {
                ldData = data;
            }
        } catch (e) {
            // ignore parse errors
        }
    });

    const cleanTitle = (t: string) => t ? t.replace(/Nonton\s+/i, '').replace(/\s+Sub\s+Indo.*$/i, '').replace(/\s+Lk21.*$/i, '').replace(/^Lk21\s+/i, '').trim() : '';

    obj['_id'] = originalUrl.split('/').reverse()[0];
    obj['title'] = cleanTitle(ldData.name || $('h1').text());
    obj['type'] = 'series';
    const posterRaw = ldData.image || $('img[itemprop="image"]').attr('src') || $('figure img').attr('src') || '';
    obj['posterImg'] = posterRaw.startsWith('//') ? `https:${posterRaw}` : posterRaw;

    obj['rating'] = $('.rating').first().text().trim() || $('[itemprop="ratingValue"]').first().text().trim() || 'N/A';
    obj['duration'] = $('span.duration').first().text().trim() || $('[itemprop="duration"]').first().text().trim() || 'N/A';
    obj['releaseDate'] = ldData.datePublished || $('span.year').first().text().trim() || 'N/A';
    obj['status'] = $('p:contains("Status")').text().replace(/Status:/i, '').trim().toLowerCase() || 'unknown';
    obj['synopsis'] = ldData.description || $('blockquote').text().trim() || $('[itemprop="description"]').text().trim() || '';
    obj['trailerUrl'] = $('iframe').attr('src') || $('a.fancybox').attr('href') || '';

    // Advanced Metadata
    const genres: string[] = Array.isArray(ldData.genre) ? ldData.genre : (ldData.genre ? [ldData.genre] : []);
    const directors: string[] = [];
    const casts: string[] = [];
    const countries: string[] = [];

    if (Array.isArray(ldData.director)) {
        ldData.director.forEach((d: any) => directors.push(d.name));
    } else if (ldData.director?.name) {
        directors.push(ldData.director.name);
    }

    if (Array.isArray(ldData.actor)) {
        ldData.actor.forEach((a: any) => casts.push(a.name));
    } else if (ldData.actor?.name) {
        casts.push(ldData.actor.name);
    }

    // Fallbacks
    if (genres.length === 0) {
        $('a[href*="/genre/"]').each((i, el) => genres.push($(el).text().trim()));
    }
    if (directors.length === 0) {
        $('a[href*="/director/"]').each((i, el) => directors.push($(el).text().trim()));
    }
    if (casts.length === 0) {
        $('a[href*="/artist/"]').each((i, el) => casts.push($(el).text().trim()));
    }
    if (countries.length === 0) {
        $('a[href*="/country/"]').each((i, el) => countries.push($(el).text().trim()));
    }

    obj['genres'] = [...new Set(genres.filter(Boolean))];
    obj['directors'] = [...new Set(directors.filter(Boolean))];
    obj['countries'] = [...new Set(countries.filter(Boolean))];
    obj['casts'] = [...new Set(casts.filter(Boolean))];

    // Streaming Links extraction from "GANTI PLAYER" buttons
    const streamingLinks: IStreamSources[] = [];
    $("a[href*='playeriframe.sbs/iframe/']").each((i, el) => {
        const url = $(el).attr('href') || '';
        const provider = $(el).text().trim() || `Server ${i + 1}`;
        if (url) {
            streamingLinks.push({
                provider,
                url,
                resolutions: ['HD']
            });
        }
    });
    
    // Fallback: If no ganti player, use the main iframe if available
    if (streamingLinks.length === 0 && obj['trailerUrl'].includes('playeriframe.sbs')) {
        streamingLinks.push({
            provider: 'Default Server',
            url: obj['trailerUrl'],
            resolutions: ['HD']
        });
    }

    obj['streamingLinks'] = streamingLinks;

    // Seasons and Episodes
    const seasons: ISeasonsList[] = [];
    const epsWrappers = $('.serial-wrapper, .episode-list, .season-select');
    
    if (epsWrappers.length > 0) {
        epsWrappers.each((i, el) => {
            const $el = $(el);
            let episodeCount = 0;
            let seasonNum = i + 1;

            if ($el.is('select')) {
                // Handle dropdown - might need more complex logic if episodes aren't all visible
                // For now, assume current season is the one shown
                episodeCount = $('.episode-list a, .serial-wrapper a, .episode-item a').length;
                seasonNum = Number($el.val()) || 1;
            } else {
                episodeCount = $el.find('a').length;
            }

            if (episodeCount > 0) {
                seasons.push({
                    season: seasonNum,
                    totalEpisodes: episodeCount
                });
            }
        });
    } 
    
    // Fallback: If no wrappers or seasons found yet, look for episode links directly
    if (seasons.length === 0) {
        const episodeButtons = $('.episode-list a, .serial-wrapper a, .episode-item a, a[href*="-episode-"]');
        if (episodeButtons.length > 0) {
            seasons.push({
                season: 1,
                totalEpisodes: episodeButtons.length
            });
        }
    }

    obj['seasons'] = seasons;
    obj['episode'] = seasons.length > 0 ? seasons[seasons.length - 1].totalEpisodes : 0;

    return obj;
};
