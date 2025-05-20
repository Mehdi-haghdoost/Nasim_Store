"use client";

import { useEffect } from 'react';
import { refreshToken } from '@/Redux/actions/authThunks';
import { useDispatch, useSelector } from 'react-redux';

export default function useCheckAuth() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (typeof document !== 'undefined' && !user && !loading && document.cookie.includes('refreshToken')) {
      dispatch(refreshToken());
    }
  }, [dispatch, user, loading]);
}