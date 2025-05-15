import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../graphql/client';
import { 
  CREATE_TICKET, 
  ADD_MESSAGE_TO_TICKET, 
  CLOSE_TICKET 
} from '../../graphql/entities/ticket/ticket.mutations';
import { 
  GET_USER_TICKETS, 
  GET_TICKET_DETAILS, 
  GET_DEPARTMENTS_INFO 
} from '../../graphql/entities/ticket/ticket.queries';

// ایجاد تیکت جدید
export const createTicket = createAsyncThunk(
  'ticket/createTicket',
  async ({ input, file }, { rejectWithValue }) => {
    try {
      const variables = { input };
      if (file) {
        variables.file = file;
      }
      
      const { data } = await client.mutate({
        mutation: CREATE_TICKET,
        variables,
      });
      
      return data.createTicket;
    } catch (error) {
      return rejectWithValue(error.message || 'خطا در ایجاد تیکت');
    }
  }
);

// افزودن پیام به تیکت
export const addMessageToTicket = createAsyncThunk(
  'ticket/addMessageToTicket',
  async ({ input, file }, { rejectWithValue }) => {
    try {
      const variables = { input };
      if (file) {
        variables.file = file;
      }
      
      const { data } = await client.mutate({
        mutation: ADD_MESSAGE_TO_TICKET,
        variables,
      });
      
      return data.addMessageToTicket;
    } catch (error) {
      return rejectWithValue(error.message || 'خطا در ارسال پیام');
    }
  }
);

// بستن تیکت
export const closeTicket = createAsyncThunk(
  'ticket/closeTicket',
  async (ticketId, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: CLOSE_TICKET,
        variables: { ticketId },
      });
      
      return data.closeTicket;
    } catch (error) {
      return rejectWithValue(error.message || 'خطا در بستن تیکت');
    }
  }
);

// دریافت لیست تیکت‌های کاربر
export const getUserTickets = createAsyncThunk(
  'ticket/getUserTickets',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.query({
        query: GET_USER_TICKETS,
        fetchPolicy: 'network-only', // همیشه از سرور داده‌ها را دریافت کند
      });
      
      return data.getUserTickets;
    } catch (error) {
      return rejectWithValue(error.message || 'خطا در دریافت تیکت‌ها');
    }
  }
);

// دریافت جزئیات یک تیکت
export const getTicketDetails = createAsyncThunk(
  'ticket/getTicketDetails',
  async (ticketId, { rejectWithValue }) => {
    try {
      const { data } = await client.query({
        query: GET_TICKET_DETAILS,
        variables: { ticketId },
        fetchPolicy: 'network-only', // همیشه از سرور داده‌ها را دریافت کند
      });
      
      return data.getTicketDetails;
    } catch (error) {
      return rejectWithValue(error.message || 'خطا در دریافت جزئیات تیکت');
    }
  }
);

// دریافت اطلاعات دپارتمان‌ها
export const getDepartmentsInfo = createAsyncThunk(
  'ticket/getDepartmentsInfo',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.query({
        query: GET_DEPARTMENTS_INFO,
      });
      
      return data.getDepartmentsInfo;
    } catch (error) {
      return rejectWithValue(error.message || 'خطا در دریافت اطلاعات دپارتمان‌ها');
    }
  }
);