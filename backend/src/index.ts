import { AppConfig } from './appConfig.ts';
import { createCache } from './cache.ts';
import { createServer } from './server.ts';

const appConfig: AppConfig = {
    port: 3000,
    baseUrl: 'http://api.tvmaze.com',
    cors: {
        origin: 'http://localhost:5173',
        optionsSuccessStatus: 200,
    },
};
const cache = await createCache();
const server = await createServer(appConfig, cache);
server.listen(() => console.log(`Server started on port ${appConfig.port}`));
