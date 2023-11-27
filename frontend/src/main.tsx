import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { clientFactory } from './api/clientFactory.ts';
import './index.scss';
import { Home } from './views/Home/index.tsx';
import { ShowDetails } from './views/ShowDetails/index.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/show/:id',
        element: <ShowDetails />,
        loader: async ({ params }) => {
            const client = clientFactory();
            return { show: await client.getShow(Number(params.id)) };
        },
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
