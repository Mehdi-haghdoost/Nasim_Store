import { gql } from '@apollo/client';


export const ADD_TO_WISHLIST = gql`
  mutation AddToWishlist($input: WishlistItemInputType!) {
    addToWishlist(input: $input) {
      success
      message
      productId
    }
  }
`;

export const REMOVE_FROM_WISHLIST = gql`
  mutation RemoveFromWishlist($input: WishlistItemInputType!) {
    removeFromWishlist(input: $input) {
      success
      message
      productId
    }
  }
`;