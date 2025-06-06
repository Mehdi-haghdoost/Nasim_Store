// const { HttpLink, ApolloClient, InMemoryCache } = require("@apollo/client");
// const { createLinks } = require('./links');

// const httpLink = new HttpLink({
//     uri: 'http://localhost:4005/graphql',
//     credentials: 'include',
// });

// const client = new ApolloClient({
//     link: createLinks(httpLink),
//     cache: new InMemoryCache(),
//     defaultOptions: {
//         watchQuery: {
//             fetchPolicy: 'no-cache',
//             errorPolicy: 'ignore',
//         },
//         query: {
//             fetchPolicy: 'network-only',
//             errorPolicy: 'all',
//         },
//         mutate: {
//             errorPolicy: 'all',
//         },
//     },
// });

// export default client;

const { HttpLink, ApolloClient, InMemoryCache } = require("@apollo/client");
const { createLinks } = require('./links');

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4005/graphql',
    credentials: 'include',
});

const client = new ApolloClient({
    link: createLinks(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
});

export default client;