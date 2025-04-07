// # پیکربندی استور ریداکس
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { setupMiddleware } from "./middleware";

/**
 * Redux store configuration
 * Sets up the central Redux store with appropriate middleware
 */

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        setupMiddleware(getDefaultMiddleware)
            .concat(getDefaultMiddleware({
                serializableCheck: {
                    // برای کار با Apollo Client و اشیای غیرقابل سریالایز
                    ignoredActions: ['persist/PERSIST'],
                    ignoredPaths: ['auth.user.createdAt', 'auth.user.updatedAt'],
                },
            })),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;