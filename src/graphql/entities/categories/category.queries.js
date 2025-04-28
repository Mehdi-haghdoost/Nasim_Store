import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
query GetCategories {
  getCategories {
    _id
    name
    icon
    products { _id }
  }
}
`;