export type CacheConfig = {
    url: string;
};
export type AppConfig = {
    port: number;
    baseUrl: string;
    cors: {
        origin: string;
        optionsSuccessStatus: number;
    };
    cache: CacheConfig;
};
