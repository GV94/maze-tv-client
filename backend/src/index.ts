import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;
const BASE_URL = 'http://api.tvmaze.com';

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const getUrl = (path: string) => `${BASE_URL}${path}`;

app.get('*', async (req, res) => {
    try {
        const response = await fetch(getUrl(req.url));
        res.json(await response.json());
    } catch (error) {
        res.status(500).json({
            message: (error as Error)?.message || 'Something went wrong',
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
