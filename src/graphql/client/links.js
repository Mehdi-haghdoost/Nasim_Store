import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { from } from '@apollo/client';

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    if (networkError) console.error(`[Network error]: ${networkError}`);
});


export const createLinks = (httpLink) => {
    return from([errorLink, httpLink]);
};