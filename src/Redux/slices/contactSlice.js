import { createSlice } from "@reduxjs/toolkit";
import { submitContactMessage } from "../actions/contactThunks";

const initialState = {
  loading: false,
  error: null,
  success: false,
  successMessage: '',
  lastContact: null
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearContactStatus: (state) => {
      state.success = false;
      state.error = null;
      state.successMessage = '';
    },
    resetContactState: (state) => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = '';
      })
      .addCase(submitContactMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.successMessage = action.payload.message;
        state.lastContact = action.payload.contact;
      })
      .addCase(submitContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'خطا در ارسال پیام';
        state.success = false;
        state.successMessage = '';
      });
  },
});

export const { clearContactStatus, resetContactState } = contactSlice.actions;
export default contactSlice.reducer;