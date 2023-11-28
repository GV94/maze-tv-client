import { createClient } from 'redis';

export type Cache = Awaited<ReturnType<typeof createCache>>;

export const createCache = async () => {
    const redisClient = createClient();
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    await redisClient.connect();

    const put = async (url: string, data: string) => {
        return redisClient.set(url, data);
    };

    const get = async (url: string) => {
        const data = await redisClient.get(url);
        if (!data) return null;
        return JSON.parse(data);
    };

    const exists = async (url: string) => {
        return Boolean(await redisClient.exists(url));
    };

    return {
        exists,
        get,
        put,
    };
};
