import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query Me {
    me {
      _id
      username
      email
      phone
      role
      bio
      nationalId
      postalCode
      addresses {
        _id
        fullAddress
        city
        province
        isDefault
      }
    }
  }
`;

