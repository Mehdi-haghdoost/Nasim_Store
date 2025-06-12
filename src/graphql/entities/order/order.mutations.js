import { gql } from '@apollo/client';

// ایجاد سفارش جدید
export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
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

// به‌روزرسانی سفارش
export const UPDATE_ORDER = gql`
  mutation UpdateOrder($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
      _id
      trackingId
      status
      deliveryDate
      items {
        _id
        product {
          _id
          title
          image
        }
        quantity
        name
        price
        image
      }
      createdAt
      updatedAt
    }
  }
`;

// لغو سفارش
export const CANCEL_ORDER = gql`
  mutation CancelOrder($orderId: ID!) {
    cancelOrder(orderId: $orderId) {
      _id
      trackingId
      status
      items {
        _id
        product {
          _id
          title
          image
        }
        quantity
        name
        price
        image
      }
      updatedAt
    }
  }
`;