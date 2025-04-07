"use client";

import { ApolloProvider as Provider } from "@apollo/client";
import { provider as ReduxProvider } from 'react-redux';
import client from "@/graphql/client";
import store from '@/store';

/**
 * Providers component
 * Wraps the application with necessary providers (Redux and Apollo)
 */


export default function ApolloProvider({ children }) {
    return (
        <ReduxProvider store={store}>
            <Provider client={client}>
                {children}
            </Provider>
        </ReduxProvider>
    );
};