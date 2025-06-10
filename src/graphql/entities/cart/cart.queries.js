// import { gql } from '@apollo/client';

// // Query برای دریافت سبد خرید کاربر
// // این مطابق با resolver getUserCart است
// export const GET_USER_CART = gql`
//   query GetUserCart {
//     getUserCart {
//       items {
//         _id
//         product {
//           _id
//           title
//           image
//           price
//           discountedPrice
//           hasDiscount
//           stock
//         }
//         quantity
//         color
//         size
//         selectedSeller {
//           _id
//           name
//         }
//       }
//       totalPrice
//       totalDiscount
//       finalPrice
//     }
//   }
// `;

import { gql } from '@apollo/client';

// دریافت سبد خرید کاربر لاگین شده
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
          brandIcon
          category {
            _id
            name
          }
          sellers {
            _id
            name
            logo
            rating
          }
        }
        quantity
        color
        size
        selectedSeller {
          _id
          name
          logo
          rating
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