import { useDispatch } from 'react-redux';
import { showToast, hideToast } from '../slices/toastSlice';
import { toast } from 'react-toastify';

export const useToast = () => {
  const dispatch = useDispatch();

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    dispatch(showToast({ message, type: 'success' }));
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    dispatch(showToast({ message, type: 'error' }));
  };

  const closeToast = () => {
    dispatch(hideToast());
  };

  return {
    showSuccessToast,
    showErrorToast,
    closeToast
  };
};