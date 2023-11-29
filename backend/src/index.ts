import { AppConfig } from './appConfig.ts';
import { createCache } from './cache.ts';
import { createServer } from './server.ts';
import dotenv from 'dotenv';

dotenv.config();

const {API_BASE_URL, FRONTEND_BASE_URL, PORT, REDIS_URL} = process.env;

if (!API_BASE_URL) {
    throw new Error('API_BASE_URL environment variable is not set');
}

if (!FRONTEND_BASE_URL) {
    throw new Error('FRONTEND_BASE_URL environment variable is not set');
}

if (!PORT || isNaN(Number(PORT))) {
    throw new Error('PORT environment variable is not set to a number');
}

if (!REDIS_URL) {
    throw new Error('REDIS_URL environment variable is not set');
}

const appConfig: AppConfig = {
    port: Number(PORT),
    baseUrl: API_BASE_URL,
    cors: {
        origin: FRONTEND_BASE_URL,
        optionsSuccessStatus: 200,
    },
    cache: {
        url: REDIS_URL,
    }
};

const cache = await createCache(appConfig.cache);
const server = await createServer(appConfig, cache);
server.listen(appConfig.port, () => console.log(`Server started on port ${appConfig.port}`));
