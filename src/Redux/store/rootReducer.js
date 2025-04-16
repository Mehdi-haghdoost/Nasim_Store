// # ترکیب کننده تمام ریدیوسرها

import { combineReducers } from "redux";
import authReducer from '../slices/authSlice';
import cartReducer from '../slices/cartSlice';


/**
 * Root reducer combining all slice reducers
 * Add new reducers here as the application grows
 */

export const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    // اضافه کردن سایر ریدیوسرها در اینجا
});