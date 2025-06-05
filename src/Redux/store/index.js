import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { setupMiddleware } from "./middleware";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => setupMiddleware(getDefaultMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;