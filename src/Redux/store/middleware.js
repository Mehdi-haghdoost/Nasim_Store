// # تنظیمات میدل‌ورها
import { thunk } from "redux-thunk";
/**
 * Custom Redux middleware setup
 * Configure middleware for logging, async actions, etc.
 */

export const setupMiddleware = (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
        thunk,
    );
};

