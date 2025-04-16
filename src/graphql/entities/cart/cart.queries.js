import { gql } from '@apollo/client';

// Query برای دریافت سبد خرید کاربر
// این مطابق با resolver getUserCart است
export const GET_USER_CART = gql`
  query GetUserCart {
    getUserCart {
      items {
        _id
        product {
          _id
          title
          image
          price
          discountedPrice
          hasDiscount
          stock
        }
        quantity
        color
        size
        selectedSeller {
          _id
          name
        }
      }
      totalPrice
      totalDiscount
      finalPrice
    }
  }
`;