import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactMessage as submitContactMessageAction } from '../actions/contactThunks';
import { clearContactStatus, resetContactState } from '../slices/contactSlice';

export const useContact = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    success,
    successMessage,
    lastContact
  } = useSelector(state => state.contact);

  const submitContactMessage = useCallback((contactData) => {
    return dispatch(submitContactMessageAction(contactData));
  }, [dispatch]);

  const clearStatus = useCallback(() => {
    dispatch(clearContactStatus());
  }, [dispatch]);

  const resetState = useCallback(() => {
    dispatch(resetContactState());
  }, [dispatch]);

  return {
    loading,
    error,
    success,
    successMessage,
    lastContact,
    submitContactMessage,
    clearStatus,
    resetState
  };
};