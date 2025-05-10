import { useSelector, useDispatch } from "react-redux";
import { replyToComment, addComment, getUserComments } from "../actions/commentThunks";
import { openReplyForm, closeReplyForm, clearReplyStatus, clearAddStatus } from "../slices/commentSlice";

export const useComment = () => {
  const dispatch = useDispatch();
  const commentState = useSelector(state => state.comment);

  const submitReply = (replyData) => {
    return dispatch(replyToComment(replyData));
  };

  const submitComment = (commentData) => {
    return dispatch(addComment(commentData));
  };


  const fetchUserComments = (page = 1, limit = 10) => {
    return dispatch(getUserComments({ page, limit }));
  };

  return {
    // وضعیت و اکشن‌های پاسخ به کامنت
    replyForm: commentState.replyForm,
    replyLoading: commentState.replyLoading,
    replyError: commentState.replyError,
    replySuccess: commentState.replySuccess,
    submitReply,
    openReplyForm: (parentId) => dispatch(openReplyForm(parentId)),
    closeReplyForm: () => dispatch(closeReplyForm()),
    clearReplyStatus: () => dispatch(clearReplyStatus()),

    // وضعیت و اکشن‌های کامنت اصلی
    addLoading: commentState.addLoading,
    addError: commentState.addError,
    addSuccess: commentState.addSuccess,
    submitComment,
    clearAddStatus: () => dispatch(clearAddStatus()),


    // کامنت‌های کاربر
    userComments: commentState.userComments,
    totalPages: commentState.totalPages,
    currentPage: commentState.currentPage,
    totalComments: commentState.totalComments,
    userCommentsLoading: commentState.userCommentsLoading,
    userCommentsError: commentState.userCommentsError,
    fetchUserComments,
  };
};

export default useComment;