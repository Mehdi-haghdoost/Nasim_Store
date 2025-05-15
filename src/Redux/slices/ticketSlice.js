import { createSlice } from '@reduxjs/toolkit';
import { 
  createTicket, 
  addMessageToTicket, 
  closeTicket, 
  getUserTickets, 
  getTicketDetails, 
  getDepartmentsInfo 
} from '../actions/ticketThunks';

const initialState = {
  tickets: [],
  currentTicket: null,
  departmentsInfo: [],
  isLoading: false,
  error: null,
  success: null,
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    clearTicketMessages: (state) => {
      state.error = null;
      state.success = null;
    },
    resetTicketState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // ایجاد تیکت جدید
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets.push(action.payload);
        state.success = 'تیکت با موفقیت ایجاد شد';
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'خطا در ایجاد تیکت';
      })

      // افزودن پیام به تیکت
      .addCase(addMessageToTicket.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addMessageToTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        
        // به‌روزرسانی تیکت موجود در لیست
        const index = state.tickets.findIndex(ticket => ticket._id === action.payload._id);
        if (index !== -1) {
          state.tickets[index] = action.payload;
        }
        
        // اگر تیکت فعلی باز است، آن را نیز به‌روزرسانی کنیم
        if (state.currentTicket && state.currentTicket._id === action.payload._id) {
          state.currentTicket = action.payload;
        }
        
        state.success = 'پیام با موفقیت ارسال شد';
      })
      .addCase(addMessageToTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'خطا در ارسال پیام';
      })

      // بستن تیکت
      .addCase(closeTicket.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        
        // به‌روزرسانی وضعیت تیکت در لیست
        const index = state.tickets.findIndex(ticket => ticket._id === action.payload._id);
        if (index !== -1) {
          state.tickets[index] = action.payload;
        }
        
        // اگر تیکت فعلی باز است، آن را نیز به‌روزرسانی کنیم
        if (state.currentTicket && state.currentTicket._id === action.payload._id) {
          state.currentTicket = action.payload;
        }
        
        state.success = 'تیکت با موفقیت بسته شد';
      })
      .addCase(closeTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'خطا در بستن تیکت';
      })

      // دریافت لیست تیکت‌های کاربر
      .addCase(getUserTickets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets = action.payload;
      })
      .addCase(getUserTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'خطا در دریافت تیکت‌ها';
      })

      // دریافت جزئیات یک تیکت
      .addCase(getTicketDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTicketDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTicket = action.payload;
      })
      .addCase(getTicketDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'خطا در دریافت جزئیات تیکت';
      })

      // دریافت اطلاعات دپارتمان‌ها
      .addCase(getDepartmentsInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDepartmentsInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.departmentsInfo = action.payload;
      })
      .addCase(getDepartmentsInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'خطا در دریافت اطلاعات دپارتمان‌ها';
      });
  },
});

export const { clearTicketMessages, resetTicketState } = ticketSlice.actions;

export default ticketSlice.reducer;