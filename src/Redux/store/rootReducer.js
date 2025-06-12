import { combineReducers } from "redux";
import authReducer from '../slices/authSlice';
import cartReducer from '../slices/cartSlice';
import productReducer from '../slices/productSlice';
import toastReducer from '../slices/toastSlice';
import commentReducer from '../slices/commentSlice';
import categoryReducer from '../slices/categorySlice';
import filterReducer from '../slices/filterSlice';
import ticketReducer from '../slices/ticketSlice';
import wishlistReducer from '../slices/wishlistSlice'; 
import compareSlice from '../slices/compareSlice';
import contactSlice from '../slices/contactSlice';
import orderSlice from '../slices/orderSlice';

/**
 * Root reducer combining all slice reducers
 * Add new reducers here as the application grows
 */
export const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    toast: toastReducer,
    comment: commentReducer,
    category: categoryReducer,
    filter: filterReducer,
    ticket: ticketReducer,
    wishlist: wishlistReducer,
    compare: compareSlice,
    contact: contactSlice,
    order: orderSlice,
});