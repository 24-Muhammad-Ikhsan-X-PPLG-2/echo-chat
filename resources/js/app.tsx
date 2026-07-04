import { createInertiaApp } from '@inertiajs/react';
import { configureEcho } from '@laravel/echo-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Container } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

configureEcho({
    broadcaster: 'reverb',
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: '#4B5563',
    },
    setup({ App, el, props }) {
        createRoot(el as Container).render(
            <QueryClientProvider client={queryClient}>
                <App {...props} />
                <ToastContainer />
            </QueryClientProvider>,
        );
    },
});
