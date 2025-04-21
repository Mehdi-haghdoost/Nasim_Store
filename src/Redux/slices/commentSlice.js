import { createSlice } from "@reduxjs/toolkit";
import { replyToComment } from "../actions/commentThunks";

const initialState = {
  replyForm: {
    isOpen: false,
    parentId: null,
  },
  replyLoading: false,
  replyError: null,
  replySuccess: false,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    openReplyForm: (state, action) => {
      state.replyForm.isOpen = true;
      state.replyForm.parentId = action.payload;
      state.replySuccess = false;
      state.replyError = null;
    },
    closeReplyForm: (state) => {
      state.replyForm.isOpen = false;
      state.replyForm.parentId = null;
      state.replySuccess = false;
      state.replyError = null;
    },
    clearReplyStatus: (state) => {
      state.replySuccess = false;
      state.replyError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(replyToComment.pending, (state) => {
        state.replyLoading = true;
        state.replyError = null;
        state.replySuccess = false;
      })
      .addCase(replyToComment.fulfilled, (state) => {
        state.replyLoading = false;
        state.replySuccess = true;
        state.replyError = null;
        state.replyForm.isOpen = false;
        state.replyForm.parentId = null;
      })
      .addCase(replyToComment.rejected, (state, action) => {
        state.replyLoading = false;
        state.replyError = action.payload || 'خطا در ثبت پاسخ';
        state.replySuccess = false;
      });
  },
});

export const { openReplyForm, closeReplyForm, clearReplyStatus } = commentSlice.actions;
export default commentSlice.reducer;