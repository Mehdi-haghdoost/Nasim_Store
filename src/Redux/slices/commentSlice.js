import { createSlice } from "@reduxjs/toolkit";
import { replyToComment, addComment, getUserComments, deleteComment } from "../actions/commentThunks";

const initialState = {
  replyForm: {
    isOpen: false,
    parentId: null,
  },
  replyLoading: false,
  replyError: null,
  replySuccess: false,

  addLoading: false,
  addError: null,
  addSuccess: false,

  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,

  userComments: [],
  totalPages: 0,
  currentPage: 1,
  totalComments: 0,
  userCommentsLoading: false,
  userCommentsError: null,
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
    clearAddStatus: (state) => {
      state.addSuccess = false;
      state.addError = null;
    },
    clearDeleteStatus: (state) => {
      state.deleteSuccess = false;
      state.deleteError = null;
    },
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
      })

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
      })

      .addCase(getUserComments.pending, (state) => {
        state.userCommentsLoading = true;
        state.userCommentsError = null;
      })
      .addCase(getUserComments.fulfilled, (state, action) => {
        state.userCommentsLoading = false;
        state.userComments = action.payload.comments;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalComments = action.payload.totalComments;
        state.userCommentsError = null;
      })
      .addCase(getUserComments.rejected, (state, action) => {
        state.userCommentsLoading = false;
        state.userCommentsError = action.payload || 'خطا در دریافت کامنت‌های کاربر';
      })

      .addCase(deleteComment.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.deleteSuccess = true;
        state.deleteError = null;
        // به‌روزرسانی لیست کامنت‌ها با حذف کامنت موردنظر
        const commentId = action.meta.arg; // commentId از meta.arg
        state.userComments = state.userComments.filter(
          (comment) => comment._id !== commentId
        );
        state.totalComments -= 1;
        state.totalPages = Math.ceil(state.totalComments / 10); // فرض بر این است که ITEMS_PER_PAGE = 10
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload || 'خطا در حذف کامنت';
        state.deleteSuccess = false;
      });
  },
});

export const { openReplyForm, closeReplyForm, clearReplyStatus, clearAddStatus, clearDeleteStatus } =
  commentSlice.actions;
export default commentSlice.reducer;