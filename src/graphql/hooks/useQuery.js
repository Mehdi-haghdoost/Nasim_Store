import { useQuery as useApolloQuery } from "@apollo/client";

export const useCustomQuery = (query, options = {}) => {
    const result = useApolloQuery(query, {
        notifyOnNetworkStatusChange: true,
        ...options
    });

    return {
        ...result,
        isLoading: result.loading,
        isError: !!result.error,
    };
};

export default useCustomQuery;