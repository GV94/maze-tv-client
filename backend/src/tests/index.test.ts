import request from 'supertest';
import express from 'express';
import { createServer } from '../server.ts';

describe('Express Server', () => {
    let app: express.Application;
    let cache = {
        exists: jest.fn(),
        get: jest.fn(),
        put: jest.fn(),
    };
    beforeAll(async () => {
        app = await createServer(
            {
                port: 3000,
                baseUrl: 'http://example.com',
                cors: {
                    origin: 'http://myurl.com',
                    optionsSuccessStatus: 200,
                },
            },
            cache
        );
    });

    it('should handle GET requests', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).not.toBe(404);
    });

    it('should handle CORS', async () => {
        const res = await request(app).get('/');
        expect(res.headers['access-control-allow-origin']).toBe(
            'http://myurl.com'
        );
    });

    it('should handle OPTIONS requests', async () => {
        const res = await request(app).options('/');
        expect(res.statusCode).not.toBe(404);
    });

    it('should do network request if request is not cached', async () => {
        const exepcted = { data: 'foo' };
        jest.spyOn(global, 'fetch').mockResolvedValueOnce(
            Promise.resolve({
                json: () => Promise.resolve(exepcted),
            } as any)
        );
        const res = await request(app).get('/shows');
        expect(res.body).toMatchObject(exepcted);
    });

    it('should returned cached value if it exists', async () => {
        const exepcted = { data: 'foo' };
        jest.spyOn(cache, 'exists').mockResolvedValueOnce(true);
        jest.spyOn(cache, 'get').mockResolvedValueOnce(exepcted);
        const res = await request(app).get('/shows');
        expect(res.body).toMatchObject(exepcted);
    });

    it('should returned 404 if cache entry exists but value is null', async () => {
        const exepcted = null;
        jest.spyOn(cache, 'exists').mockResolvedValueOnce(true);
        jest.spyOn(cache, 'get').mockResolvedValueOnce(exepcted);
        const res = await request(app).get('/shows');
        expect(res.statusCode).toBe(404);
        expect(res.body).toMatchObject({ message: 'Not found' });
    });

    it('should returned 500 if an exception is thrown', async () => {
        jest.spyOn(cache, 'exists').mockRejectedValueOnce(new Error());
        const res = await request(app).get('/shows');
        expect(res.statusCode).toBe(500);
        expect(res.body).toMatchObject({ message: 'Something went wrong' });
    });

    it('should return error message if there is one', async () => {
        jest.spyOn(cache, 'exists').mockRejectedValueOnce(new Error('foo'));
        const res = await request(app).get('/shows');
        expect(res.statusCode).toBe(500);
        expect(res.body).toMatchObject({ message: 'foo' });
    });
});
