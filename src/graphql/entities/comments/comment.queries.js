import { gql } from '@apollo/client';

export const GET_PRODUCT_COMMENTS = gql`
  query GetProductComments($productId: ID!) {
    productComments(productId: $productId) {
      _id
      commentText
      rating
      strengths
      weaknesses
      name
      createdAt
      isReply
      status
      parent {
        _id
      }
      replies {
        _id
        commentText
        name
        isReply
        createdAt  # مطمئن شوید این فیلد وجود دارد
        user {
          _id
          username
        }
      }
      user {
        _id
        username
      }
    }
  }
`;

export const GET_USER_COMMENTS = gql`
  query GetUserComments($page: Int, $limit: Int) {
    getUserComments(page: $page, limit: $limit) {
      comments {
        _id
        commentText
        rating
        status
        createdAt
        product {
          _id
          title
          image
        }
        strengths
        weaknesses
      }
      totalPages
      currentPage
      totalComments
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