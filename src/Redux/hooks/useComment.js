import { useSelector, useDispatch } from "react-redux";
import { replyToComment, addComment, getUserComments, deleteComment } from "../actions/commentThunks";
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
    replyForm: commentState.replyForm,
    replyLoading: commentState.replyLoading,
    replyError: commentState.replyError,
    replySuccess: commentState.replySuccess,
    submitReply,
    openReplyForm: (parentId) => dispatch(openReplyForm(parentId)),
    closeReplyForm: () => dispatch(closeReplyForm()),
    clearReplyStatus: () => dispatch(clearReplyStatus()),

    addLoading: commentState.addLoading,
    addError: commentState.addError,
    addSuccess: commentState.addSuccess,
    submitComment,
    clearAddStatus: () => dispatch(clearAddStatus()),

    deleteLoading: commentState.deleteLoading,
    deleteError: commentState.deleteError,
    deleteSuccess: commentState.deleteSuccess,
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),

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