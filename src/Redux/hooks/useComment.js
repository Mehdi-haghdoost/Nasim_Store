// import { useSelector, useDispatch } from "react-redux";
// import { replyToComment, addComment, getUserComments, deleteComment } from "../actions/commentThunks";
// import { openReplyForm, closeReplyForm, clearReplyStatus, clearAddStatus } from "../slices/commentSlice";

// export const useComment = () => {
//   const dispatch = useDispatch();
//   const commentState = useSelector(state => state.comment);

//   const submitReply = (replyData) => {
//     return dispatch(replyToComment(replyData));
//   };

//   const submitComment = (commentData) => {
//     return dispatch(addComment(commentData));
//   };

//   const fetchUserComments = (page = 1, limit = 10) => {
//     return dispatch(getUserComments({ page, limit }));
//   };

//   return {
//     replyForm: commentState.replyForm,
//     replyLoading: commentState.replyLoading,
//     replyError: commentState.replyError,
//     replySuccess: commentState.replySuccess,
//     submitReply,
//     openReplyForm: (parentId) => dispatch(openReplyForm(parentId)),
//     closeReplyForm: () => dispatch(closeReplyForm()),
//     clearReplyStatus: () => dispatch(clearReplyStatus()),

//     addLoading: commentState.addLoading,
//     addError: commentState.addError,
//     addSuccess: commentState.addSuccess,
//     submitComment,
//     clearAddStatus: () => dispatch(clearAddStatus()),

//     deleteLoading: commentState.deleteLoading,
//     deleteError: commentState.deleteError,
//     deleteSuccess: commentState.deleteSuccess,
//     deleteComment: (commentId) => dispatch(deleteComment(commentId)),

//     userComments: commentState.userComments,
//     totalPages: commentState.totalPages,
//     currentPage: commentState.currentPage,
//     totalComments: commentState.totalComments,
//     userCommentsLoading: commentState.userCommentsLoading,
//     userCommentsError: commentState.userCommentsError,
//     fetchUserComments,
//   };
// };

// export default useComment;

// این فایل باید در مسیر C:\Users\LENOVO\Desktop\Nassim_Store\src\Redux\hooks\useComment.js قرار بگیرد
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
    return dispatch(addCommentAction(commentData)).unwrap();
  }, [dispatch]);

  const replyToComment = useCallback((replyData) => {
    return dispatch(replyToCommentAction(replyData)).unwrap();
  }, [dispatch]);

  const fetchUserComments = useCallback((page = 1, limit = 10) => {
    return dispatch(getUserCommentsAction({ page, limit })).unwrap();
  }, [dispatch]);

  const deleteComment = useCallback((commentId) => {
    return dispatch(deleteCommentAction(commentId)).unwrap();
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
    addComment,
    replyToComment,
    fetchUserComments,
    deleteComment,
  };
};