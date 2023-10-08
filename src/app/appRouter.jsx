import { createHashRouter } from 'react-router-dom';
import { AppLayout } from './appLayout.jsx';
import { ErrorPage } from '/src/pages/error';
import { MainPage } from '/src/pages/main';
import { PostPage } from '/src/pages/posts';

export const appRouter = createHashRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <MainPage />
            },
            {
                path: '/posts/:postId',
                element: <PostPage />
            }
        ]
    }
]);
