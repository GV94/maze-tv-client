import express from 'express';
import cors from 'cors';
import { createCache } from './cache';
import type { Cache } from './cache';

const appConfig = {
    port: 3000,
    baseUrl: 'http://api.tvmaze.com',
    cors: {
        origin: 'http://localhost:5173',
        optionsSuccessStatus: 200,
    },
};

const app = express();
const cache = await createCache();
app.use(cors(appConfig.cors));
app.get('*', createRequestHandlerWithCache(cache));
app.listen(appConfig.port, () => {
    console.log(`Server running on http://localhost:${appConfig.port}`);
});

function createRequestHandlerWithCache(cache: Cache) {
    return async (req: express.Request, res: express.Response) => {
        try {
            if (await cache.exists(req.url)) {
                const data = await cache.get(req.url);
                return data
                    ? res.json(data)
                    : res.status(404).json({ message: 'Not found' });
            }

            const json = await callExternalApi(req.url);
            await cache.put(req.url, JSON.stringify(json));
            return res.json(json);
        } catch (error) {
            res.status(500).json({
                message: (error as Error)?.message || 'Something went wrong',
            });
        }
    };
}

async function callExternalApi(path: string) {
    const response = await fetch(createExternalApiUrl(path));
    return response.json();
}

function createExternalApiUrl(path: string) {
    return `${appConfig.baseUrl}${path}`;
}
