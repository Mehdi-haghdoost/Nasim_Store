// # پیکربندی استور ریداکس
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

/**
 * Redux store configuration
 * Sets up the central Redux store with appropriate middleware
 */

export const store = configureStore({
    reducer : rootReducer,
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck : {
                // برای کار با Apollo Client و اشیای غیرقابل سریالایز
                ignoredActions : ['persist/PERSIST'],
                ignoredPaths : ['auth.user.createdAt', 'auth.user.updatedAt'],
            },
        }),
        devTools : process.env.NODE_ENV !== 'production',
});

export default store;