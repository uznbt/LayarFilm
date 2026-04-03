import { NextFunction as Next, Request, Response } from 'express';
import { scrapeSearchedMoviesOrSeries } from '../scrapers/search';

type TController = (req: Request, res: Response, next?: Next) => Promise<void>;

/**
 * Controller for /search/:title route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const searchedMoviesOrSeries: TController = async (req, res) => {
    try {
        const { title = '' } = req.params;

        const fetchReq = await fetch(`${process.env.LK21_URL}/?s=${title}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        
        const html = await fetchReq.text();
        console.log(`[Search] Fetched HTML length: ${html.length}`);
        if(html.length < 500) console.log(`[Search] HTML sample: ${html}`);
        
        const mockAxiosRes = { data: html } as any;

        const payload = await scrapeSearchedMoviesOrSeries(req, mockAxiosRes);
        console.log(`[Search] Extracted payload size: ${payload?.length}`);

        res.status(200).json(payload);
    } catch (err) {
        console.error(err);
        res.status(400).json([]);
    }
};
