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
