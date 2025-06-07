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

// const { HttpLink, ApolloClient, InMemoryCache } = require("@apollo/client");
// const { createLinks } = require('./links');

// const httpLink = new HttpLink({
//     uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4005/graphql',
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


const getGraphQLUrl = () => {

    if (process.env.NEXT_PUBLIC_GRAPHQL_URL) {
        console.log('🔧 Using environment variable:', process.env.NEXT_PUBLIC_GRAPHQL_URL);
        return process.env.NEXT_PUBLIC_GRAPHQL_URL;
    }
    
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        console.log('🌐 Current hostname:', hostname);
        
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            console.log('🏠 Development environment detected');
            return 'http://localhost:4005/graphql';
        } else if (hostname === 'nasimstore-production.up.railway.app') {
            console.log('🚀 Production environment detected');
            return 'https://nasim-backend.up.railway.app/graphql';
        }
    }
    
    const url = process.env.NODE_ENV === 'production' 
        ? 'https://nasim-backend.up.railway.app/graphql'
        : 'http://localhost:4005/graphql';
    
    console.log('📋 Fallback URL:', url);
    return url;
};

const graphqlUrl = getGraphQLUrl();
console.log('🎯 Final GraphQL URL:', graphqlUrl);

const httpLink = new HttpLink({
    uri: graphqlUrl,
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
});

const client = new ApolloClient({
    link: createLinks(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'all',
        },
        query: {
            fetchPolicy: 'cache-first', 
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
});

export default client;