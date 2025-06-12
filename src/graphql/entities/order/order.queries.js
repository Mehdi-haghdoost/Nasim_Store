import { gql } from '@apollo/client';

// دریافت سفارشات کاربر
export const GET_USER_ORDERS = gql`
  query GetUserOrders($userId: ID) {
    getUserOrders(userId: $userId) {
      _id
      user {
        _id
        username
        email
      }
      trackingId
      items {
        _id
        product {
          _id
          title
          image
          price
          discountedPrice
          hasDiscount
          brandIcon
          originalName
        }
        quantity
        name
        price
        image
      }
      orderDate
      recipient
      phoneNumber
      shippingAddress
      postalCode
      totalAmount
      paymentMethod
      discountCoupon {
        code
        discountPercentage
        used
      }
      shippingCost
      deliveryDate
      status
      createdAt
      updatedAt
    }
  }
`;

// دریافت سفارش با ID
export const GET_ORDER_BY_ID = gql`
  query GetOrderById($orderId: ID!) {
    getOrderById(orderId: $orderId) {
      _id
      user {
        _id
        username
        email
        phone
      }
      trackingId
      items {
        _id
        product {
          _id
          title
          image
          price
          discountedPrice
          hasDiscount
          brandIcon
          originalName
        }
        quantity
        name
        price
        image
      }
      orderDate
      recipient
      phoneNumber
      shippingAddress
      postalCode
      totalAmount
      paymentMethod
      discountCoupon {
        code
        discountPercentage
        used
      }
      shippingCost
      deliveryDate
      status
      createdAt
      updatedAt
    }
  }
`;

// پیگیری سفارش با شماره پیگیری
export const GET_ORDER_BY_TRACKING_ID = gql`
  query GetOrderByTrackingId($trackingId: String!) {
    getOrderByTrackingId(trackingId: $trackingId) {
      _id
      trackingId
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
        name
        price
        image
      }
      orderDate
      recipient
      phoneNumber
      shippingAddress
      postalCode
      totalAmount
      paymentMethod
      shippingCost
      deliveryDate
      status
      createdAt
      updatedAt
    }
  }
`;

// دریافت همه سفارشات (برای ادمین)
export const GET_ALL_ORDERS = gql`
  query GetAllOrders {
    getAllOrders {
      _id
      user {
        _id
        username
        email
        phone
      }
      trackingId
      items {
        _id
        product {
          _id
          title
          image
          price
        }
        quantity
        name
        price
        image
      }
      orderDate
      recipient
      phoneNumber
      shippingAddress
      totalAmount
      paymentMethod
      shippingCost
      deliveryDate
      status
      createdAt
      updatedAt
    }
  }
`;