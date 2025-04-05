const { HttpLink, ApolloClient, InMemoryCache } = require("@apollo/client");
const {createLinks} = require('./links');

const httpLink = new HttpLink({
    uri: "http://localhost:4005/graphql",
});

const client = new ApolloClient({
    link: createLinks(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
    },
    mutate: {
        errorPolicy: 'all',
    },
});

export default client;