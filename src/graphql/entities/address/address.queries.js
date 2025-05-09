import { gql } from '@apollo/client';

export const GET_ALL_ADDRESSES = gql`
  query GetAllAddress {
    getAllAddress {
      _id
      street
      province
      city
      fullAddress
      isDefault
    }
  }
`;

export const GET_ADDRESS_BY_ID = gql`
  query GetAddressById($addressId: ID!) {
    getAddressById(addressId: $addressId) {
      _id
      street
      province
      city
      fullAddress
      isDefault
    }
  }
`;