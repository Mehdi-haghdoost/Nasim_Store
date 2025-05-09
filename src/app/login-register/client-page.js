"use client";
import React, { useState } from "react";
import Login from "@/components/templates/login-register/Login";
import Register from "@/components/templates/login-register/Register";
import { authTypes } from "../../utils/constans";
import { useAuth } from "@/Redux/hooks/useAuth";

export default function ClientPage() {
  const [authType, setAuthType] = useState(authTypes.LOGIN);
  const { isAuthenticated } = useAuth();

  const showRegisterForm = () => setAuthType(authTypes.REGISTER);
  const showLoginForm = () => setAuthType(authTypes.LOGIN);

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