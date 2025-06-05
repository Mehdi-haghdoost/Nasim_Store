export const setupMiddleware = (getDefaultMiddleware) => {
    return getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST'],
            ignoredPaths: ['auth.user.createdAt', 'auth.user.updatedAt'],
        },
    });
};