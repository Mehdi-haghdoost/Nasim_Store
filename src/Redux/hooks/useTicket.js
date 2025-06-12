import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTicket,
  addMessageToTicket,
  closeTicket,
  getUserTickets,
  getTicketDetails,
  getDepartmentsInfo
} from '../actions/ticketThunks';
import { clearTicketMessages, resetTicketState } from '../slices/ticketSlice';

export const useTicket = () => {
  const dispatch = useDispatch();
  const { 
    tickets, 
    currentTicket, 
    departmentsInfo, 
    isLoading, 
    error, 
    success 
  } = useSelector((state) => state.ticket);

  useEffect(() => {
    // پاک کردن پیام‌های موفقیت و خطا بعد از 5 ثانیه
    if (error || success) {
      const timer = setTimeout(() => {
        dispatch(clearTicketMessages());
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error, success, dispatch]);

  // ارسال تیکت جدید
  const handleCreateTicket = async (ticketData, file = null) => {
    return dispatch(createTicket({ input: ticketData, file })).unwrap();
  };

  // ارسال پیام جدید به تیکت
  const handleSendMessage = async (ticketId, text, file = null) => {
    const messageData = {
      ticketId,
      text
    };
    
    return dispatch(addMessageToTicket({ input: messageData, file })).unwrap();
  };

  // بستن تیکت
  const handleCloseTicket = async (ticketId) => {
    return dispatch(closeTicket(ticketId)).unwrap();
  };

  // دریافت همه تیکت‌های کاربر
  const fetchUserTickets = () => {
    dispatch(getUserTickets());
  };

  // دریافت جزئیات یک تیکت
  const fetchTicketDetails = (ticketId) => {
    dispatch(getTicketDetails(ticketId));
  };

  // دریافت اطلاعات دپارتمان‌ها
  const fetchDepartmentsInfo = () => {
    dispatch(getDepartmentsInfo());
  };

  // پاک کردن وضعیت
  const clearTicketState = () => {
    dispatch(resetTicketState());
  };

  return {
    tickets,
    currentTicket,
    departmentsInfo,
    isLoading,
    error,
    success,
    handleCreateTicket,
    handleSendMessage,
    handleCloseTicket,
    fetchUserTickets,
    fetchTicketDetails,
    fetchDepartmentsInfo,
    clearTicketState,
  };
};

export default useTicket;

