import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './appRouter.jsx';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { ErrorBoundary } from '/src/shared/utils/index.js';
import { baseApi } from '/src/shared/api/index.js';

function App() {
    return (
        <ErrorBoundary fallback={ErrorBoundary}>
            <ApiProvider api={baseApi}>
                <ChakraProvider>
                    <RouterProvider router={appRouter} />
                </ChakraProvider>
            </ApiProvider>
        </ErrorBoundary>
    );
}

export default App;
