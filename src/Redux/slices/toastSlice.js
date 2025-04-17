import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  type: 'success', // success, error, warning, info
  isVisible: false,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload.message || 'عملیات با موفقیت انجام شد';
      state.type = action.payload.type || 'success';
      state.isVisible = true;
    },
    hideToast: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;