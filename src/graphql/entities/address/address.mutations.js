// src/graphql/entities/address/address.mutations.js
import { gql } from '@apollo/client';

export const ADD_ADDRESS = gql`
  mutation AddNewAddress($input: AddressInput!) {
    addNewAddress(input: $input) {
      _id
      street
      province
      city
      fullAddress
      isDefault
    }
  }
`;

export const DELETE_ADDRESS = gql`
  mutation DeleteAddress($addressId: ID!) {
    deleteAddress(addressId: $addressId)
  }
`;

export const UPDATE_ADDRESS_DEFAULT = gql`
  mutation UpdateAddressDefault($input: UpdateAddressDefaultInput!) {
    updateAddressDefault(input: $input) {
      _id
      street
      province
      city
      fullAddress
      isDefault
    }
  }
`;

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