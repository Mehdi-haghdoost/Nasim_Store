import { gql } from '@apollo/client';

// Query برای دریافت اطلاعات محصول
// نام query باید با resolver های سرور مطابقت داشته باشد
export const GET_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) {
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
      sellers {
        _id
        name
        customerSatisfaction
        isSelected
        price
        shippingMethod
        performance
      }
      category {
        _id
        name
      }
      comments {
        _id
        user {
          username
        }
        rating
        text
        createdAt
      }
    }
  }
`;

// Query برای دریافت محصولات مشابه
export const GET_SIMILAR_PRODUCTS = gql`
  query SimilarProducts($categoryId: ID!, $limit: Int) {
    similarProducts(categoryId: $categoryId, limit: $limit) {
      _id
      title
      originalName
      image
      price
      discountedPrice
      hasDiscount
      rating
      stock
    }
  }
`;

// Query برای دریافت محصولات پرفروش
export const GET_BEST_SELLING_PRODUCTS = gql`
  query BestSellingProducts($limit: Int) {
    bestSellingProducts(limit: $limit) {
      _id
      title
      originalName
      image
      price
      discountedPrice
      hasDiscount
      rating
      stock
    }
  }
`;