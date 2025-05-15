import { gql } from '@apollo/client';

// دریافت همه تیکت‌های کاربر
export const GET_USER_TICKETS = gql`
  query GetUserTickets {
    getUserTickets {
      _id
      title
      department
      subDepartment
      priority
      status
      createdAt
      updatedAt
      messages {
        sender
        text
        createdAt
      }
    }
  }
`;

// دریافت جزئیات یک تیکت
export const GET_TICKET_BY_ID = gql`
  query GetTicketById($ticketId: ID!) {
    getTicketById(ticketId: $ticketId) {
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

// دریافت دپارتمان‌ها و ساب دپارتمان‌ها
export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    getDepartments {
      departmentId
      departmentName
      subDepartments
    }
  }
`;