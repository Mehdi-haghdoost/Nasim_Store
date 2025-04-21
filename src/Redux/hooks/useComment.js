import { useSelector, useDispatch } from "react-redux";
import { replyToComment } from "../actions/commentThunks";
import { openReplyForm, closeReplyForm, clearReplyStatus } from "../slices/commentSlice";

export const useComment = () => {
  const dispatch = useDispatch();
  const commentState = useSelector(state => state.comment);

  const submitReply = (replyData) => {
    return dispatch(replyToComment(replyData));
  };

  return {
    replyForm: commentState.replyForm,
    replyLoading: commentState.replyLoading,
    replyError: commentState.replyError,
    replySuccess: commentState.replySuccess,
    submitReply,
    openReplyForm: (parentId) => dispatch(openReplyForm(parentId)),
    closeReplyForm: () => dispatch(closeReplyForm()),
    clearReplyStatus: () => dispatch(clearReplyStatus())
  };
};

export default useComment;