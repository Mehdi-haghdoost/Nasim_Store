import { createSlice } from "@reduxjs/toolkit";
import { replyToComment, addComment } from "../actions/commentThunks";

const initialState = {
  replyForm: {
    isOpen: false,
    parentId: null,
  },
  replyLoading: false,
  replyError: null,
  replySuccess: false,
  
  // اضافه کردن وضعیت برای کامنت اصلی
  addLoading: false,
  addError: null,
  addSuccess: false,
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
    },
    // اضافه کردن اکشن برای پاک کردن وضعیت کامنت اصلی
    clearAddStatus: (state) => {
      state.addSuccess = false;
      state.addError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // وضعیت‌های پاسخ به کامنت
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
      })
      
      // وضعیت‌های افزودن کامنت اصلی
      .addCase(addComment.pending, (state) => {
        state.addLoading = true;
        state.addError = null;
        state.addSuccess = false;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.addLoading = false;
        state.addSuccess = true;
        state.addError = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.payload || 'خطا در ثبت کامنت';
        state.addSuccess = false;
      });
  },
});

export const { openReplyForm, closeReplyForm, clearReplyStatus, clearAddStatus } = commentSlice.actions;
export default commentSlice.reducer;