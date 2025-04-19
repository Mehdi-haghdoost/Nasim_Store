import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
  query product($id: ID!) {
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
        key
        value
      }
      colors {
        color
        available
      }
      sellers {
        _id
        name
        performance     
        satisfaction    
        performanceStatus
        isSelected      
        logo            
        rating          
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
          strengths
          weaknesses
          isReply
        rating
        commentText
        createdAt
           replies {
              _id
               name
                commentText
        user {
          username
        }
      }
      }
      customerSatisfaction
      salesCount
      createdAt
      updatedAt
    }
  }
`;
export const GET_SIMILAR_PRODUCTS = gql`
  query similarProducts($categoryId: ID!, $limit: Int) {
    similarProducts(categoryId: $categoryId, limit: $limit) {
      _id
      title
      originalName
      image  # اینجا هم image
      price
      discountedPrice
      hasDiscount
      stock
      rating
      brandIcon
    }
  }
`;

export const GET_BEST_SELLING_PRODUCTS = gql`
  query bestSellingProducts($limit: Int) {
    bestSellingProducts(limit: $limit) {
      _id
      title
      originalName
      image  # اینجا هم image
      price
      discountedPrice
      hasDiscount
      stock
      rating
      brandIcon
      salesCount
    }
  }
`;