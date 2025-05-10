import { gql } from '@apollo/client';

export const ADD_COMMENT = gql`
  mutation AddComment($input: CommentInput!) {
    addComment(input: $input) {
      _id
      commentText
      rating
      strengths
      weaknesses
      status
      createdAt
      user {
        _id
        username
      }
    }
  }
`;

export const REPLY_TO_COMMENT = gql`
  mutation ReplyToComment($input: ReplyCommentInput!) {
    replyToComment(input: $input) {
      _id
      commentText
      rating
      isReply
      status
      createdAt
      user {
        _id
        username
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      success
      message
    }
  }
`;