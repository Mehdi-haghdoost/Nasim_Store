import { gql } from '@apollo/client';

// Mutation برای افزودن محصول جدید
// مطابق با resolver addProduct در سرور
export const ADD_PRODUCT = gql`
  mutation AddProduct($input: ProductInputType!) {
    addProduct(input: $input) {
      _id
      title
      originalName
      image
      price
      discountedPrice
      hasDiscount
      stock
      description
      specifications
      rating
      brandIcon
      features {
        name
        value
      }
      colors {
        name
        code
        available
      }
      category {
        _id
        name
      }
      sellers {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;