import { gql } from '@apollo/client';

export const SUBMIT_CONTACT = gql`
  mutation SubmitContact($name: String!, $email: String!, $message: String!, $saveInfo: String) {
    submitContact(name: $name, email: $email, message: $message, saveInfo: $saveInfo) {
      success
      message
      contact {
        id
        name
        email
        message
        saveInfo
        createdAt
      }
    }
  }
`;