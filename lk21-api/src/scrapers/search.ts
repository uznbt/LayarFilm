import cheerio from 'cheerio';
import { AxiosResponse } from 'axios';
import { Request } from 'express';
import { ISearchedMoviesOrSeries } from '../types';

/**
 * Scrape searched movies or series
 * @param {Request} req
 * @param {AxiosResponse} res
 * @returns {Promise.<ISearchedMoviesOrSeries[]>} array of movies or series
 */
export const scrapeSearchedMoviesOrSeries = async (
    req: Request,
    res: AxiosResponse
): Promise<ISearchedMoviesOrSeries[]> => {
    const $: cheerio.Root = cheerio.load(res.data);
    const payload: ISearchedMoviesOrSeries[] = [];
    const {
        headers: { host },
        protocol,
    } = req;

    $('article').each((i, el) => {
        const parent = $(el).find('figure > a');
        if (parent.length === 0) return;

        const href = parent.attr('href');
        const slug = href ? href.replace(/^\//, '') : '';
        
        let isSeries = false;
        if (parent.find('span.episode').length > 0) isSeries = true;

        const title = parent.find('.poster-title').text() || parent.find('img').attr('alt');
        const posterImg = parent.find('img').attr('src') || parent.find('img').attr('data-src');

        const obj = {} as ISearchedMoviesOrSeries;

        obj['_id'] = slug || '';
        obj['title'] = title || '';
        obj['type'] = isSeries ? 'series' : 'movie';
        obj['posterImg'] = posterImg && !posterImg.startsWith('http') ? `https:${posterImg}` : (posterImg || '');
        obj['url'] = `${protocol}://${host}/${isSeries ? 'series' : 'movies'}/${slug}`;
        obj['genres'] = [];
        obj['directors'] = [];
        obj['casts'] = [];

        payload.push(obj);
    });

    return payload;
};
