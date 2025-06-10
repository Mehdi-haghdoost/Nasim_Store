// import { gql } from '@apollo/client';

// // Mutation برای افزودن محصول به سبد خرید
// // مطابق با resolver addToCart
// export const ADD_TO_CART = gql`
//   mutation AddToCart($input: AddToCartInput!) {
//     addToCart(input: $input) {
//       _id
//       product {
//         _id
//         title
//         image
//         price
//         discountedPrice
//         hasDiscount
//         stock
//       }
//       quantity
//       color
//       size
//       selectedSeller {
//         _id
//         name
//       }
//     }
//   }
// `;

// // Mutation برای به‌روزرسانی تعداد محصول در سبد خرید
// // مطابق با resolver updateCartItem
// export const UPDATE_CART_ITEM = gql`
//   mutation UpdateCartItem($input: UpdateCartItemInput!) {
//     updateCartItem(input: $input)
//   }
// `;

// // Mutation برای حذف محصول از سبد خرید
// // مطابق با resolver removeFromCart
// export const REMOVE_FROM_CART = gql`
//   mutation RemoveFromCart($itemId: ID!) {
//     removeFromCart(itemId: $itemId)
//   }
// `;

// // Mutation برای پاک کردن کامل سبد خرید
// // مطابق با resolver clearCart
// export const CLEAR_CART = gql`
//   mutation ClearCart {
//     clearCart
//   }
// `;

import { gql } from '@apollo/client';

// افزودن محصول به سبد خرید کاربر لاگین شده
export const ADD_TO_CART = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
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
          brandIcon
        }
        quantity
        color
        size
        selectedSeller {
          _id
          name
          logo
        }
        addedAt
      }
      totalPrice
      totalDiscount
      finalPrice
      lastModified
    }
  }
`;

// به‌روزرسانی تعداد محصول در سبد خرید
export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($input: UpdateCartItemInput!) {
    updateCartItem(input: $input) {
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
      lastModified
    }
  }
`;

// حذف محصول از سبد خرید
export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($itemId: ID!) {
    removeFromCart(itemId: $itemId) {
      items {
        _id
        product {
          _id
          title
          image
          price
          discountedPrice
          hasDiscount
        }
        quantity
        color
        size
      }
      totalPrice
      totalDiscount
      finalPrice
      lastModified
    }
  }
`;

// پاک کردن کامل سبد خرید
export const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart
  }
`;

// سینک کردن سبد مهمان با سبد کاربر
export const SYNC_GUEST_CART = gql`
  mutation SyncGuestCart($input: SyncCartInput!) {
    syncGuestCart(input: $input) {
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
          brandIcon
        }
        quantity
        color
        size
        selectedSeller {
          _id
          name
          logo
        }
        addedAt
      }
      totalPrice
      totalDiscount
      finalPrice
      lastModified
    }
  }
`;