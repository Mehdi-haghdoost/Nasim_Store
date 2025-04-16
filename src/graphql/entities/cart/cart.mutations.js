import { gql } from '@apollo/client';

// Mutation برای افزودن محصول به سبد خرید
// مطابق با resolver addToCart
export const ADD_TO_CART = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
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
  }
`;

// Mutation برای به‌روزرسانی تعداد محصول در سبد خرید
// مطابق با resolver updateCartItem
export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($input: UpdateCartItemInput!) {
    updateCartItem(input: $input)
  }
`;

// Mutation برای حذف محصول از سبد خرید
// مطابق با resolver removeFromCart
export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($itemId: ID!) {
    removeFromCart(itemId: $itemId)
  }
`;

// Mutation برای پاک کردن کامل سبد خرید
// مطابق با resolver clearCart
export const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart
  }
`;