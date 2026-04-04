import { NextFunction as Next, Request, Response } from 'express';
import { scrapeSeries, scrapeSeriesDetails } from '../scrapers/series';
import { ND_URL } from '../config';

type TController = (req: Request, res: Response, next?: Next) => Promise<void>;

const commonHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Referer': ND_URL,
    'Upgrade-Insecure-Requests': '1',
    'Cache-Control': 'max-age=0',
};

const handleFetch = async (url: string, req: Request, res: Response, scraper: any) => {
    try {
        console.log(`[Series API] Fetching ${url}`);
        const response = await fetch(url, { headers: commonHeaders });
        if (!response.ok) throw new Error(`Target site returned ${response.status}: ${response.statusText}`);
        
        const html = await response.text();
        const mockAxiosRes = { data: html } as any;

        const payload = await scraper(req, mockAxiosRes);
        res.status(200).json(payload);
    } catch (err: any) {
        console.error(`[Series API Error] ${err.message}`);
        res.status(400).json({ error: true, message: err.message, targetUrl: url });
    }
};

export const latestSeries: TController = async (req, res) => {
    const { page = 1 } = req.query;
    const url = `${ND_URL}/latest-series${Number(page) > 1 ? `/page/${page}` : ''}`;
    await handleFetch(url, req, res, scrapeSeries);
};

export const popularSeries: TController = async (req, res) => {
    const { page = 1 } = req.query;
    const url = `${ND_URL}/top-series-today${Number(page) > 1 ? `/page/${page}` : ''}`;
    await handleFetch(url, req, res, scrapeSeries);
};

export const recentReleaseSeries: TController = async (req, res) => {
    const { page = 1 } = req.query;
    const url = `${ND_URL}/release${Number(page) > 1 ? `/page/${page}` : ''}`;
    await handleFetch(url, req, res, scrapeSeries);
};

export const topRatedSeries: TController = async (req, res) => {
    const { page = 1 } = req.query;
    const url = `${ND_URL}/rating${Number(page) > 1 ? `/page/${page}` : ''}`;
    await handleFetch(url, req, res, scrapeSeries);
};

export const seriesDetails: TController = async (req, res) => {
    const { id } = req.params;
    const url = `${ND_URL}/${id}`;
    await handleFetch(url, req, res, scrapeSeriesDetails);
};
