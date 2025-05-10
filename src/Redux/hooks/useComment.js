import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addComment as addCommentAction,
  replyToComment as replyToCommentAction,
  getUserComments as getUserCommentsAction,
  deleteComment as deleteCommentAction
} from '../actions/commentThunks';
import {
  openReplyForm,
  closeReplyForm,
  clearReplyStatus,
  clearAddStatus,
  clearDeleteStatus
} from '../slices/commentSlice';

export const useComment = () => {
  const dispatch = useDispatch();
  const {
    replyForm,
    replyLoading,
    replyError,
    replySuccess,
    addLoading,
    addError,
    addSuccess,
    deleteLoading,
    deleteError,
    deleteSuccess,
    userComments,
    totalPages,
    currentPage,
    totalComments,
    userCommentsLoading,
    userCommentsError,
  } = useSelector(state => state.comment);

  const setOpenReplyForm = useCallback((parentId) => {
    dispatch(openReplyForm(parentId));
  }, [dispatch]);

  const setCloseReplyForm = useCallback(() => {
    dispatch(closeReplyForm());
  }, [dispatch]);

  const clearReply = useCallback(() => {
    dispatch(clearReplyStatus());
  }, [dispatch]);

  const clearAdd = useCallback(() => {
    dispatch(clearAddStatus());
  }, [dispatch]);

  const clearDelete = useCallback(() => {
    dispatch(clearDeleteStatus());
  }, [dispatch]);

  const addComment = useCallback((commentData) => {
    return dispatch(addCommentAction(commentData));
  }, [dispatch]);

  const replyToComment = useCallback((replyData) => {
    return dispatch(replyToCommentAction(replyData));
  }, [dispatch]);

  const fetchUserComments = useCallback((page = 1, limit = 10) => {
    return dispatch(getUserCommentsAction({ page, limit }));
  }, [dispatch]);

  const deleteComment = useCallback((commentId) => {
    return dispatch(deleteCommentAction(commentId));
  }, [dispatch]);

  return {
    replyForm,
    replyLoading,
    replyError,
    replySuccess,
    addLoading,
    addError,
    addSuccess,
    deleteLoading,
    deleteError,
    deleteSuccess,
    userComments,
    totalPages,
    currentPage,
    totalComments,
    userCommentsLoading,
    userCommentsError,
    setOpenReplyForm,
    setCloseReplyForm,
    clearReply,
    clearAdd,
    clearDelete,
    addComment, // اطمینان حاصل کنید که این متد به درستی صادر می‌شود
    submitComment: addComment, // برای سازگاری با نام متفاوت در Comments.js
    replyToComment,
    fetchUserComments,
    deleteComment,
  };
};