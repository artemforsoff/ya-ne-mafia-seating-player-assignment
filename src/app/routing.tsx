import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { pages } from '@/pages';

const router = createBrowserRouter([
    {
        path: '/',
        element: <pages.MainPage />,
    },
]);

export const Router = () => <RouterProvider router={router} />;
