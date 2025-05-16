import { gql } from '@apollo/client';

export const GET_USER_WISHLIST = gql`
  query GetUserWishlist {
    getUserWishlist {
      _id
      title
      originalName
      price
      image
      discountedPrice
      hasDiscount
      discountPercentage
      brand {
        name
      }
      category {
        name
      }
      stock
    }
  }
`;

export const IS_IN_WISHLIST = gql`
  query IsInWishlist($productId: ID!) {
    isInWishlist(productId: $productId)
  }
`;