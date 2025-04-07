import { useMutation as useApolloMutation } from "@apollo/client";

/**
 * Custom hook that wraps Apollo's useMutation with additional functionality
 * 
 * @param {DocumentNode} mutation - The GraphQL mutation
 * @param {Object} options - Mutation options (variables, onCompleted, etc.)
 * @returns {Array} Enhanced mutation result with isLoading alias
 */

export const useCustomMutation = (mutation , options = {}) => {
    const [mutate , result] = useApolloMutation(mutation,options);

    return [
        mutate,
        {
            ...result,
            isLoading : result.loading,
            isError : !! result.error,
        },
    ];
};

export default useCustomMutation;

