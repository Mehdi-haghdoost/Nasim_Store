import { gql } from '@apollo/client';

// ایجاد تیکت جدید
export const CREATE_TICKET = gql`
  mutation CreateTicket($input: CreateTicketInput!, $file: String) {
    createTicket(input: $input, file: $file) {
      _id
      title
      department
      subDepartment
      priority
      status
      createdAt
      updatedAt
      initialRequest
      username
      messages {
        sender
        text
        createdAt
      }
      attachments {
        fileUrl
        fileName
        fileType
        uploadedAt
      }
    }
  }
`;

// افزودن پیام جدید به تیکت
export const ADD_MESSAGE_TO_TICKET = gql`
  mutation AddMessageToTicket($input: AddMessageInput!, $file: String) {
    addMessageToTicket(input: $input, file: $file) {
      _id
      status
      updatedAt
      messages {
        sender
        text
        createdAt
      }
      attachments {
        fileUrl
        fileName
        fileType
        uploadedAt
      }
    }
  }
`;

// بستن تیکت
export const CLOSE_TICKET = gql`
  mutation CloseTicket($ticketId: ID!) {
    closeTicket(ticketId: $ticketId) {
      _id
      status
      updatedAt
      messages {
        sender
        text
        createdAt
      }
    }
  }
`;