import { NextFunction as Next, Request, Response } from 'express';
import { scrapeSearchedMoviesOrSeries } from '../scrapers/search';
import { LK21_URL } from '../config';

type TController = (req: Request, res: Response, next?: Next) => Promise<void>;

const commonHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Referer': LK21_URL,
    'Upgrade-Insecure-Requests': '1',
};

/**
 * Controller for /search/:title route
 */
export const searchedMoviesOrSeries: TController = async (req, res) => {
    const { title = '' } = req.params;
    const url = `${LK21_URL}/?s=${encodeURIComponent(title)}`;
    
    try {
        console.log(`[Search API] Fetching ${url}`);
        const response = await fetch(url, { headers: commonHeaders });
        if (!response.ok) throw new Error(`Target site returned ${response.status}: ${response.statusText}`);
        
        const html = await response.text();
        const mockAxiosRes = { data: html } as any;

        const payload = await scrapeSearchedMoviesOrSeries(req, mockAxiosRes);
        res.status(200).json(payload);
    } catch (err: any) {
        console.error(`[Search API Error] ${err.message}`);
        res.status(400).json({ error: true, message: err.message, targetUrl: url });
    }
};
