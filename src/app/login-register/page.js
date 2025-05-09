"use client";
import React, { useState, useEffect } from "react";
import Login from "@/components/templates/login-register/Login";
import Register from "@/components/templates/login-register/Register";
import { authTypes } from "../../utils/constans";
import { useAuth } from "@/Redux/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { checkAuth } from "@/Redux/actions/authThunks";

function Page() {
  const [authType, setAuthType] = useState(authTypes.LOGIN);
  const [initialLoading, setInitialLoading] = useState(true); // وضعیت لودینگ اولیه
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  // بررسی اولیه احراز هویت با اولویت بالا
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // ریدایرکت در صورت احراز هویت
  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace("/");
      } else {
        setInitialLoading(false); // اگر کاربر لاگین نیست، لودینگ را متوقف کن
      }
    }
  }, [isAuthenticated, loading, router]);

  const showRegisterForm = () => setAuthType(authTypes.REGISTER);
  const showLoginForm = () => setAuthType(authTypes.LOGIN);

  // نمایش لودینگ تا زمانی که وضعیت احراز هویت مشخص شود
  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      {authType === authTypes.LOGIN ? (
        <Login showRegisterForm={showRegisterForm} />
      ) : (
        <Register showLoginForm={showLoginForm} />
      )}
    </>
  );
}

export default Page;