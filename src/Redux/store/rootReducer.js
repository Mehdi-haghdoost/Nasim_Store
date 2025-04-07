// # ترکیب کننده تمام ریدیوسرها

import { combineReducers } from "redux";
import authReducer from '../slices/authSlice';


/**
 * Root reducer combining all slice reducers
 * Add new reducers here as the application grows
 */

export const rootReducer = combineReducers({
    auth: authReducer,
    // اضافه کردن سایر ریدیوسرها در اینجا
});