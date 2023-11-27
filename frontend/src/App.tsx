import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { clientFactory } from './api/clientFactory';
import { Home } from './views/Home';
import { ShowDetails } from './views/ShowDetails';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/show/:id',
        element: <ShowDetails />,
        loader: async ({ params }) => {
            return { show: await clientFactory().getShow(Number(params.id)) };
        },
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
