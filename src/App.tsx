import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { client } from './api/client';
import { Home } from './views/Home/Home';
import { ShowDetailsPage } from './views/ShowDetails/ShowDetailsPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/show/:id',
        element: <ShowDetailsPage />,
        loader: async ({ params }) => {
            return { show: await client().getShow(Number(params.id)) };
        },
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
