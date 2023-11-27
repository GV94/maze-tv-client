import express from 'express';
import cors from 'cors';
import { createClient } from 'redis';

const app = express();
const port = 3000;
const BASE_URL = 'http://api.tvmaze.com';

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const redisClient = createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));
await redisClient.connect();

const getUrl = (path: string) => `${BASE_URL}${path}`;

const callApi = async (path: string) => {
    const response = await fetch(getUrl(path));
    return response.json();
};

const resolveDataFromCache = async (url: string) => {
    const data = await redisClient.get(url);
    if (!data) return null;
    return JSON.parse(data);
};

const requestIsCached = async (url: string) => {
    return redisClient.exists(url);
};

app.get('*', async (req, res) => {
    try {
        if (await requestIsCached(req.url)) {
            const data = await resolveDataFromCache(req.url);
            return data
                ? res.json(data)
                : res.status(404).json({ message: 'Not found' });
        }

        const json = await callApi(req.url);
        await redisClient.set(req.url, JSON.stringify(json));
        return res.json(json);
    } catch (error) {
        res.status(500).json({
            message: (error as Error)?.message || 'Something went wrong',
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
