import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      _id
      image
      title
      originalName
      price
      discountedPrice
      hasDiscount
      stock
      description
      specifications
      rating
      brandIcon
      salesCount
      customerSatisfaction
      features {
        key
        value
      }
      colors {
        color
        available
      }
      highlights {
        feature
      }
      category {
        _id
        name
        icon
      }
      sellers {
        _id
        name
        logo
      }
      comments {
        _id
        commentText
        rating
        name
        email
        website
        createdAt
        updatedAt
        isReply
        strengths
        weaknesses
        parent {
          _id
        }
        replies {
          _id
          commentText
          rating
          name
          email
          isReply
          createdAt
          strengths
          weaknesses
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
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
  bestSellingProducts {
    _id
    image
    title
    originalName
    price
    discountedPrice
    hasDiscount
    stock
    rating
    comments { _id }
    colors { color available }
    category { _id name icon }
  }
}
`;

export const GET_SIMILAR_PRODUCTS = gql`
  query GetSimilarProducts($categoryId: ID!, $limit: Int) {
    similarProducts(categoryId: $categoryId, limit: $limit) {
      _id
      image
      title
      originalName
      price
      discountedPrice
      hasDiscount
      stock
      rating
      category {
        _id
        name
      }
    }
  }
`;

export const GET_COMMENTS_BY_PRODUCT = gql`
  query GetCommentsByProduct($productId: ID!) {
    commentsByProduct(productId: $productId) {
      _id
      commentText
      rating
      name
      email
      website
      createdAt
      updatedAt
      isReply
      strengths
      weaknesses
      parent {
        _id
      }
      replies {
        _id
        commentText
        rating
        name
        email
        createdAt
        updatedAt
        isReply
        strengths
        weaknesses
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