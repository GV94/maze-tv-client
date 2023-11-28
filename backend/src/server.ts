import express from 'express';
import cors from 'cors';
import type { Cache } from './cache.ts';
import { AppConfig } from './appConfig.ts';

export const createServer = async (config: AppConfig, cache: Cache) => {
    const app = express();
    app.use(cors(config.cors));
    app.get('*', createRequestHandlerWithCache(cache));

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
                    message:
                        (error as Error)?.message || 'Something went wrong',
                });
            }
        };
    }

    async function callExternalApi(path: string) {
        const response = await fetch(createExternalApiUrl(path));
        return response.json();
    }

    function createExternalApiUrl(path: string) {
        return `${config.baseUrl}${path}`;
    }

    return app;
};
